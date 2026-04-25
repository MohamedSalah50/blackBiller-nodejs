import { DataTypes } from 'sequelize';
import sequelize from '../connection.db.js';

// const sequelize = getSequelize();

const UserRole = sequelize.define('UserRole', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  role_name:       { type: DataTypes.STRING, allowNull: false },
  role_code:       { type: DataTypes.STRING, allowNull: true },
  role_type:       { type: DataTypes.STRING, allowNull: true },
  scope:           { type: DataTypes.STRING, allowNull: true },
  hierarchy_level: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: 'user_roles',
  timestamps: true,
  underscored: true,
});

UserRole.prototype.isGlobal = function () {
  return this.scope === 'global';
};

export default UserRole;