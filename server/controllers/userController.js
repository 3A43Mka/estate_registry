const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, History} = require('../models/models')

const generateJwt = (id, email, role) => {
  return jwt.sign(
    {id, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  );
}

class UserController {
  async register(req, res, next) {
    const {fullname, dob, passport_series, passport_id,
      passport_date, passport_authority, taxpayer_number, email, password} = req.body;

    if (!fullname || !dob || !passport_id || !passport_date ||
      !passport_authority || !email || !password) {
      return next(ApiError.badRequest('Invalid data for registration'));
    }

    const candidate = await User.findOne({where: {email}});
    if (candidate) {
      return next(ApiError.badRequest('User with such email already exists'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({fullname, dob, passport_series, passport_id, passport_date,
      passport_authority, taxpayer_number, email, password: hashPassword});
    // creating log
    await History.create({type: 'USER_REGISTERED', userId: user.id});
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({token})
  }

  async login(req, res, next) {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if (!user) {
      return next(ApiError.internal('User not found'));
    }
    if (!user.is_active) {
      return next(ApiError.internal('User is deactivated'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Wrong password'));
    }
    // creating log
    await History.create({type: 'USER_LOGGED_IN', userId: user.id});
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({token});
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({token});
  }

  async getAll(req, res) {
    const users = await User.findAll({order: [
        ['id', 'ASC'],
      ],});
    return res.json(users);
  }

  async toggleUser(req, res) {
    const {id} = req.params;
    const user = await User.findOne(
      {
        where: {id}
      },
    );
    if (!user) {
      return next(ApiError.internal('User not found'));
    }
    if (user.role !== "RECORDER") {
      return next(ApiError.forbidden('User is not recorder'));
    }
    const result = await User.update(
      { is_active: !user.is_active },
      { where: { id } }
    );
    // creating log
    if (user.is_active) {
      await History.create({type: 'USER_DEACTIVATED', userId: user.id});
    } else {
      await History.create({type: 'USER_ACTIVATED', userId: user.id});
    }
    return res.json(result);
  }
}

module.exports = new UserController()