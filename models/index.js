const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require("../configration/dbconfig")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// Import models
db.user = require("./users")(sequelize, DataTypes);
db.role = require("./role")(sequelize, DataTypes);
// Export the db object
module.exports = db;
