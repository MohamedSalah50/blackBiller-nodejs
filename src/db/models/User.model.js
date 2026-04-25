import { DataTypes } from 'sequelize';
import  sequelize  from '../connection.db.js';

// const sequelize = getSequelize();

const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  role_id:            { type: DataTypes.BIGINT, allowNull: true },
  full_name:          { type: DataTypes.STRING, allowNull: true },
  email:              { type: DataTypes.STRING, allowNull: true },
  country_code:       { type: DataTypes.STRING, allowNull: true },
  mobile:             { type: DataTypes.STRING, allowNull: true },
  password:           { type: DataTypes.STRING, allowNull: true },
  whatsapp_no:        { type: DataTypes.STRING, allowNull: true },
  profile_image:      { type: DataTypes.STRING, allowNull: true },
  dob:                { type: DataTypes.DATEONLY, allowNull: true },
  employee_code:      { type: DataTypes.STRING, allowNull: true },
  current_latitude:   { type: DataTypes.DECIMAL(10, 8), allowNull: true },
  current_longitude:  { type: DataTypes.DECIMAL(11, 8), allowNull: true },
  zone:               { type: DataTypes.STRING, allowNull: true },
  otp:                { type: DataTypes.STRING, allowNull: true },
  otp_expires_at:     { type: DataTypes.DATE, allowNull: true },
  mobile_verified:    { type: DataTypes.BOOLEAN, defaultValue: false },
  email_verified:     { type: DataTypes.BOOLEAN, defaultValue: false },
  status:             { type: DataTypes.STRING, allowNull: true },
  created_by:         { type: DataTypes.BIGINT, allowNull: true },
  referral_code:      { type: DataTypes.STRING, allowNull: true },
  license_key:        { type: DataTypes.STRING, allowNull: true },
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
  defaultScope: {
    attributes: { exclude: ['password', 'otp'] }, 
  },
  scopes: {
    withSecret: { attributes: {} }, 
  },
});

export default User;