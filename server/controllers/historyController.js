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
      const logs = await History.findAndCountAll({limit, offset, include: [{model: Request, as: 'request'},
          {model: Record, as: 'record'}]});
      return res.json({logs});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }
}

module.exports = new HistoryController()