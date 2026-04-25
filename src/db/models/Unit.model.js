import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";

const Unit = sequelize.define(
  "Unit",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    symbol: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "units",
    timestamps: true,
    underscored: true,
  },
);

export default Unit;
