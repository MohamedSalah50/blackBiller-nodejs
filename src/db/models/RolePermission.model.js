import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";

const RolePermission = sequelize.define(
  "RolePermission",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    role_id: { type: DataTypes.BIGINT, allowNull: false },
    module_id: { type: DataTypes.BIGINT, allowNull: false },
    can_view: { type: DataTypes.BOOLEAN, defaultValue: false },
    can_create: { type: DataTypes.BOOLEAN, defaultValue: false },
    can_update: { type: DataTypes.BOOLEAN, defaultValue: false },
    can_delete: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "role_permissions",
    timestamps: true,
    underscored: true,
  },
);

export default RolePermission;
