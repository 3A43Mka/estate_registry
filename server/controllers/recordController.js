const ApiError = require('../error/ApiError');
const {User, History, Record, Request, Issuer, Estate} = require('../models/models')

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
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      const records = await Record.findAndCountAll({
        limit,
        offset,
        include: [{
          model: Request,
          as: 'request',
          include: [{model: Issuer, as: 'issuer'}, {model: Estate, as: 'estate'}]
        }]
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