import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";

const SystemModule = sequelize.define(
  "SystemModule",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    module_name: { type: DataTypes.STRING, allowNull: false },
    module_group: { type: DataTypes.STRING, allowNull: true },
    module_code: { type: DataTypes.STRING, allowNull: true },
    is_pro_feature: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "system_modules",
    timestamps: true,
    underscored: true,
  },
);

export default SystemModule;
