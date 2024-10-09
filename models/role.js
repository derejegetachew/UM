const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Role; // Make sure to return the Role model
};
