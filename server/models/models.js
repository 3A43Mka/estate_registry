const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  fullname: {type: DataTypes.STRING, allowNull: false},
  dob: {type: DataTypes.DATE, allowNull: false},
  passport_series: {type: DataTypes.STRING},
  passport_id: {type: DataTypes.STRING, allowNull: false},
  passport_date: {type: DataTypes.DATE, allowNull: false},
  passport_authority: {type: DataTypes.STRING, allowNull: false},
  taxpayer_number: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING, unique: true, allowNull: false},
  password: {type: DataTypes.STRING, allowNull: false},
  role: {type: DataTypes.STRING, defaultValue: "RECORDER", allowNull: false},
  is_active: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: "1"}
});

const Building = sequelize.define('building', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false}
});

const Street = sequelize.define('street', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false}
});

const Settlement = sequelize.define('settlement', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false}
});

const District = sequelize.define('district', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false}
});

const Region = sequelize.define('region', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false}
});

const Record = sequelize.define('record', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  is_active: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: "1"},
});

const Request = sequelize.define('request', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  type: {type: DataTypes.STRING, allowNull: false},
  requisites: {type: DataTypes.STRING, allowNull: false},
  ownership_share: {type: DataTypes.INTEGER, allowNull: false},
  issued_at: {type: DataTypes.DATE, allowNull: false},
});

const Estate = sequelize.define('estate', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  type: {type: DataTypes.STRING, allowNull: false},
  cadastral_number: {type: DataTypes.STRING, allowNull: false},
  registration_number: {type: DataTypes.STRING, allowNull: false},
  document_number: {type: DataTypes.STRING, allowNull: false}
});

const Issuer = sequelize.define('issuer', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  fullname: {type: DataTypes.STRING, allowNull: false},
  dob: {type: DataTypes.DATE, allowNull: false},
  unique_number: {type: DataTypes.STRING},
  taxpayer_number: {type: DataTypes.STRING},
  document: {type: DataTypes.STRING, allowNull: false},
  contacts: {type: DataTypes.STRING, allowNull: false},
});

const History = sequelize.define('history', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  reason: {type: DataTypes.STRING},
  type: {type: DataTypes.STRING, allowNull: false},
});

//describing address relations
Region.hasMany(District);
District.belongsTo(Region);

District.hasMany(Settlement);
Settlement.belongsTo(District);

Settlement.hasMany(Street);
Street.belongsTo(Settlement);

Street.hasMany(Building);
Building.belongsTo(Street);
Building.hasOne(Estate);
Building.hasOne(Issuer);

//describing user's relations
User.hasMany(Request);
User.hasMany(Record);
User.hasMany(History);

//describing request's relations
Request.hasOne(Record);
Request.hasOne(History);
Request.belongsTo(User);
Request.belongsTo(Issuer);
Request.belongsTo(Estate);

//describing record's relations
Record.belongsTo(User);
Record.hasOne(History);
Record.belongsTo(Request);

//describing history's relations
History.belongsTo(User);
History.belongsTo(Request);
History.belongsTo(Record);

//describing issuer's relations
Issuer.hasMany(Request);
Issuer.belongsTo(Building);

//describing estate's relations
Estate.hasMany(Request);
Estate.belongsTo(Building);

module.exports = {
  User,
  Building,
  Street,
  Settlement,
  District,
  Region,
  Record,
  Request,
  Estate,
  Issuer,
  History
}