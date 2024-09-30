const Sequelize = require("sequelize");
const config = require("../configration/dbconfig.js");

const sequelize = new Sequelize(
  config.DB, 
  config.USER, 
  config.PASSWORD, 
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import the User model
db.user = require("./users.js")(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);

// Define associations
db.user.belongsToMany(db.role, {
  through: "user_roles",
  as: "roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
  as: "users",
  foreignKey: "roleId",
  otherKey: "userId",
});

module.exports = db;
