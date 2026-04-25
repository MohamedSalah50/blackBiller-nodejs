import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";

const Timezone = sequelize.define(
  "Timezone",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "timezones",
    timestamps: true,
    underscored: true,
  },
);

export default Timezone;
