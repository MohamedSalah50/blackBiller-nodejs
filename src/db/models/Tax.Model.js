import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";

const Tax = sequelize.define(
  "Tax",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    tax_type: { type: DataTypes.STRING, allowNull: true },
    parent_id: { type: DataTypes.BIGINT, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    rate: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
    group_type: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "taxes",
    timestamps: true,
    underscored: true,
  },
);

export default Tax;
