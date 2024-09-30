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

// Import the User and Role models
db.user = require("./users.js")(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);
db.userRoles = require("./userRoles.js")(sequelize, Sequelize); // Include join table

// Define associations
db.user.belongsToMany(db.role, {
  through: db.userRoles, // Use the join table
  as: "roles",           // Alias for the relationship
  foreignKey: "userId", // Foreign key for the user
  otherKey: "roleId"    // Foreign key for the role
});

db.role.belongsToMany(db.user, {
  through: db.userRoles, // Use the join table
  as: "users",           // Alias for the relationship
  foreignKey: "roleId",  // Foreign key for the role
  otherKey: "userId"     // Foreign key for the user
});

module.exports = db;
