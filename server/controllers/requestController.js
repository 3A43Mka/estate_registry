const ApiError = require('../error/ApiError');
const {History, Request, Region, District, Settlement, Street, Building, Estate, Issuer} = require('../models/models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class RequestController {
  async add(req, res, next) {
    try {
      const {type, requisites, ownership_share, issued_at, issuerId, estateId, reason} = req.body;

      if (!type || !requisites || !ownership_share || !issued_at || !issuerId || !estateId) {
        return next(ApiError.badRequest('Invalid data for Request creation'));
      }

      if (ownership_share <= 0 || ownership_share > 100) {
        return next(ApiError.badRequest('Invalid data for Request creation'));
      }

      const newRequest = await Request.create({
        type,
        requisites,
        ownership_share,
        issued_at,
        issuerId,
        estateId,
        userId: req.user.id
      });
      // creating log
      await History.create({type: 'REQUEST_ADDED', userId: req.user.id, requestId: newRequest.id, reason: reason});
      return res.json({newRequest});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

  async getAll(req, res, next) {
    try {
      let {limit, page} = req.query;
      // parameters for request
      let {type, requisites, ownership_share, issued_at} = req.query;
      // parameters for issuer
      let {fullname, dob, unique_number, taxpayer_number, contacts} = req.query;
      // parameters for estate
      let {name, building_type, cadastral_number, registration_number, document_number} = req.query;
      let requestOptions = {};
      let issuerOptions = {};
      let estateOptions = {};

      // filling request options
      if (type) requestOptions.type = type;
      if (requisites) requestOptions.requisites = requisites;
      if (ownership_share) requestOptions.ownership_share = ownership_share;
      if (issued_at) requestOptions.issued_at = {[Op.gte]: new Date(issued_at)};

      // filling issuer options
      if (fullname) issuerOptions.fullname = {[Op.like]: `%${fullname}%`};
      if (dob) issuerOptions.dob = {[Op.gte]: new Date(dob)};
      if (unique_number) issuerOptions.unique_number = unique_number;
      if (taxpayer_number) issuerOptions.taxpayer_number = taxpayer_number;
      if (contacts) issuerOptions.contacts = {[Op.like]: `%${contacts}%`};

      // filling estate options
      if (name) estateOptions.name = {[Op.like]: `%${name}%`};
      if (building_type) estateOptions.type = {[Op.like]: `%${building_type}%`};
      if (cadastral_number) estateOptions.cadastral_number = cadastral_number;
      if (registration_number) estateOptions.registration_number = registration_number;
      if (document_number) estateOptions.document_number = document_number;

      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      const requests = await Request.findAndCountAll({
        limit,
        offset,
        where: requestOptions,
        include: [{model: Issuer, as: 'issuer', where: issuerOptions}, {
          model: Estate,
          as: 'estate',
          where: estateOptions
        }],
        order: [
          ['id', 'DESC'],
        ]
      });
      return res.json({requests});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params;
      const request = await Request.findOne({
        where: {id},
        include: [{model: Issuer, as: 'issuer'}, {model: Estate, as: 'estate'}]
      });
      return res.json({request});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }
}

module.exports = new RequestController()