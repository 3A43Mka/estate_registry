const ApiError = require('../error/ApiError');
const {User, History, Record, Request, Issuer, Estate} = require('../models/models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class RecordController {
  async add(req, res, next) {
    try {
      const {requestId} = req.body;

      if (!requestId) {
        return next(ApiError.badRequest('Invalid data for Record creation'));
      }

      const newRecord = await Record.create({
        userId: req.user.id,
        requestId
      });
      // creating log
      await History.create({type: 'RECORD_ADDED', userId: req.user.id, recordId: newRecord.id});
      return res.json({newRecord});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

// @TODO search
  async getAll(req, res, next) {
    try {
      let {limit, page} = req.query;
      // parameters for request
      let {type, requisites, ownership_share, issued_at} = req.query;
      // parameters for issuer
      let {fullname, dob, unique_number, taxpayer_number, contacts} = req.query;
      // parameters for estate
      let {name, building_type, cadastral_number, registration_number, document_number} = req.query;
      let recordOptions = {};
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
      const records = await Record.findAndCountAll({
        limit,
        offset,
        where: recordOptions,
        include: [{
          model: Request,
          as: 'request',
          where: requestOptions,
          include: [{model: Issuer, as: 'issuer', where: issuerOptions}, {
            model: Estate,
            as: 'estate',
            where: estateOptions
          }]
        }],
        order: [
          ['id', 'DESC'],
        ]
      });
      return res.json({records});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

  async getActive(req, res, next) {
    try {
      let {limit, page} = req.query;
      // parameters for request
      let {type, requisites, ownership_share, issued_at} = req.query;
      // parameters for issuer
      let {fullname, dob, unique_number, taxpayer_number, contacts} = req.query;
      // parameters for estate
      let {name, building_type, cadastral_number, registration_number, document_number} = req.query;
      let recordOptions = {};
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
      const records = await Record.findAndCountAll({
        limit,
        offset,
        where: {is_active: true},
        include: [{
          model: Request,
          as: 'request',
          where: requestOptions,
          include: [{model: Issuer, as: 'issuer', where: issuerOptions}, {
            model: Estate,
            as: 'estate',
            where: estateOptions
          }]
        }],
        order: [
          ['id', 'DESC'],
        ]
      });
      return res.json({records});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params;
      const record = await Record.findOne({
        where: {id},
        include: [{
          model: Request,
          as: 'request',
          include: [{model: Issuer, as: 'issuer'}, {model: Estate, as: 'estate'}]
        }]
      });
      return res.json({record});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

  async toggleRecord(req, res) {
    const {id, reason} = req.params;
    const record = await Record.findOne(
      {
        where: {id}
      },
    );
    if (!record) {
      return next(ApiError.internal('Record not found'));
    }
    const result = await Record.update(
      {is_active: !record.is_active},
      {where: {id}}
    );
    // creating log
    await History.create({type: 'RECORD_TOGGLED', userId: req.user.id, recordId: record.id, reason: reason});
    return res.json(result);
  }
}

module.exports = new RecordController()