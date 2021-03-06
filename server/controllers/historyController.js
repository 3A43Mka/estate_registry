const ApiError = require('../error/ApiError');
const {User, History, Record, Request} = require('../models/models')

class HistoryController {

// @TODO search
  async getAll(req, res, next) {
    try {
      let {limit, page} = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      console.log("OFFSET", offset);
      const logs = await History.findAndCountAll({
        limit, offset, include: [{model: Request, as: 'request'},
          {model: Record, as: 'record'}, {model: User, as: 'user'}], order: [
          ['id', 'DESC'],
        ],
      });
      return res.json({logs});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

  async getRequestLogs(req, res, next) {
    try {
      let {id} = req.params;
      const logs = await History.findAll({where: {requestId: id}});
      return res.json({logs});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

  async getRecordLogs(req, res, next) {
    try {
      let {id} = req.params;
      const logs = await History.findAll({where: {recordId: id}});
      return res.json({logs});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

}

module.exports = new HistoryController()