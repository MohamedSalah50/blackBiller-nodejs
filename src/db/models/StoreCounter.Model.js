import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";

const StoreCounter = sequelize.define(
  "StoreCounter",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    store_id: { type: DataTypes.BIGINT, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    counter_code: { type: DataTypes.STRING, allowNull: true },
    assigned_user_id: { type: DataTypes.BIGINT, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "store_counters",
    timestamps: true,
    underscored: true,
  },
);

export default StoreCounter;
