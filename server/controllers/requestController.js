const ApiError = require('../error/ApiError');
const {History, Request, Region, District, Settlement, Street, Building} = require('../models/models')

class RequestController {
  async add(req, res, next) {
    try {
      const {type, requisites, ownership_share, issued_at, issuerId, estateId} = req.body;

      if (!type || !requisites || !ownership_share || !issued_at || !issuerId || !estateId) {
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
      await History.create({type: 'REQUEST_ADDED', userId: req.user.id, requestId: newRequest.id});
      return res.json({newRequest});
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
      const requests = await Request.findAndCountAll({limit, offset});
      return res.json({requests});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params;
      const request = await Request.findOne({where: {id}});
      return res.json({request});
    } catch (e) {
      return next(ApiError.internal(e));
    }
  }
}

module.exports = new RequestController()