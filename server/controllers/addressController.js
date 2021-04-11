const ApiError = require('../error/ApiError');
const {Building, Region, District, Settlement, Street} = require('../models/models')

class AddressController {
  async getFullAddress(req, res) {
    const {id} = req.params;
    const building = await Building.findOne(
      {
        where: {id}
      },
    );
    if (!building) {
      return next(ApiError.internal('Building not found!'));
    }
    const street = await Street.findOne(
      {
        where: {id: building.streetId}
      },
    );
    if (!street) {
      return next(ApiError.internal('Street not found!'));
    }
    const settlement = await Settlement.findOne(
      {
        where: {id: street.settlementId}
      },
    );
    if (!settlement) {
      return next(ApiError.internal('Settlement not found!'));
    }
    const district = await District.findOne(
      {
        where: {id: settlement.districtId}
      },
    );
    if (!district) {
      return next(ApiError.internal('District not found!'));
    }
    const region = await Region.findOne(
      {
        where: {id: district.regionId}
      },
    );
    if (!region) {
      return next(ApiError.internal('Region not found!'));
    }
    return res.json({region, district, settlement, street, building});
  }
}

module.exports = new AddressController()