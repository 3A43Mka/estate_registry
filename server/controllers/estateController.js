const ApiError = require('../error/ApiError');
const {Estate, Region, District, Settlement, Street, Building} = require('../models/models')

class EstateController {
  async add(req, res, next) {
    try {
      const {
        name, type, cadastral_number, registration_number, document_number, region,
        district, settlement, street, building
      } = req.body;

      if (!name || !type || !cadastral_number || !registration_number || !document_number || !region
        || !district || !settlement || !street || !building) {
        return next(ApiError.badRequest('Invalid data for Estate creation'));
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

      const newEstate = await Estate.create({
        name,
        type,
        cadastral_number,
        registration_number,
        document_number,
        buildingId
      });
      // creating log
      await History.create({type: 'ESTATE_ADDED', userId: req.user.id});
      return res.json({newEstate});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

  async getAll(req, res, next) {
    try {
      const estates = await Estate.findAll();
      return res.json({estates});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params;
      const estate = await Estate.findOne({where: {id}});
      return res.json({estate});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }
}

module.exports = new EstateController();