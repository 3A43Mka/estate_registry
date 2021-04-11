const ApiError = require('../error/ApiError');
const {User,  History, Issuer, Region, District, Settlement, Street, Building} = require('../models/models')

class IssuerController {
  async add(req, res, next) {
    try {
      const {
        fullname, dob, unique_number, taxpayer_number, document, contacts, region,
        district, settlement, street, building
      } = req.body;

      if (!fullname || !dob || !document || !contacts || !region || !district ||
        !settlement || !street || !building) {
        return next(ApiError.badRequest('Invalid data for Issuer creation'));
      }
      let regionId = null;
      const findRegion = await Region.findOne({where: {name: region}});
      if (!findRegion) {
        regionId = (await Region.create({name: region})).id;
      } else {
        regionId = findRegion.id;
      }
      let districtId = null;
      const findDistrict = await District.findOne({where: {name: district, regionId}});
      if (!findDistrict) {
        districtId = (await District.create({name: district, regionId: regionId})).id;
      } else {
        districtId = findDistrict.id;
      }

      let settlementId = null;
      const findSettlement = await Settlement.findOne({where: {name: settlement, districtId}});
      if (!findSettlement) {
        settlementId = (await Settlement.create({name: settlement, districtId: districtId})).id;
      } else {
        settlementId = findSettlement.id;
      }

      let streetId = null;
      const findStreet = await Street.findOne({where: {name: street, settlementId}});
      if (!findStreet) {
        streetId = (await Street.create({name: street, settlementId: settlementId})).id;
      } else {
        streetId = findStreet.id;
      }

      let buildingId = null;
      const findBuilding = await Building.findOne({where: {name: building, streetId}});
      if (!findBuilding) {
        buildingId = (await Building.create({name: building, streetId: streetId})).id;
      } else {
        buildingId = findBuilding.id;
      }

      const newIssuer = await Issuer.create({
        fullname,
        dob,
        unique_number,
        taxpayer_number,
        document,
        contacts,
        buildingId
      });
      // creating log
      await History.create({type: 'ISSUER_ADDED', userId: req.user.id});
      return res.json({newIssuer});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

  async getAll(req, res, next) {
    try {
      const issuers = await Issuer.findAll();
      return res.json({issuers});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params;
      const issuer = await Issuer.findOne({where: {id}});
      return res.json({issuer});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }
}

module.exports = new IssuerController()