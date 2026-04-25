import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";

const UnitConversion = sequelize.define(
  "UnitConversion",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    base_unit_id: { type: DataTypes.BIGINT, allowNull: false },
    sub_unit_id: { type: DataTypes.BIGINT, allowNull: false },
    factor: { type: DataTypes.DECIMAL(10, 4), allowNull: true },
    note: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "unit_conversions",
    timestamps: true,
    underscored: true,
  },
);

export default UnitConversion;
