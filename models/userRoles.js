module.exports = (sequelize, Sequelize) => {
  const UserRole = sequelize.define("user_roles", {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // refers to table name
        key: 'id',      // refers to column name in users table
      }
    },
    roleId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'roles', // refers to table name
        key: 'id',      // refers to column name in roles table
      }
    }
  }, {
    timestamps: false,
  });

  return UserRole;
};
