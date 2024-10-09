const Sequelize = require("sequelize");
const config = require("../configration/dbconfig.js");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Adjust path and case sensitivity
db.user = require("./users.js")(sequelize, Sequelize.DataTypes);  
db.role = require("./Role.js")(sequelize, Sequelize.DataTypes);

// Associations
db.user.belongsToMany(db.role, {
  through: "user_roles",
  as: "roles",
  foreignKey: "userId",
});
db.role.belongsToMany(db.user, {
  through: "user_roles",
  as: "users",
  foreignKey: "roleId",
});
module.exports = db;
