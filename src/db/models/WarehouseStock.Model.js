import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";

const WarehouseStock = sequelize.define(
  "WarehouseStock",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    warehouse_id: { type: DataTypes.BIGINT, allowNull: false },
    item_id: { type: DataTypes.BIGINT, allowNull: false },
    batch_no: { type: DataTypes.STRING, allowNull: true },
    expiry_date: { type: DataTypes.DATEONLY, allowNull: true },
    available_qty: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    reserved_qty: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  },
  {
    tableName: "warehouse_stock",
    timestamps: true,
    underscored: true,
  },
);

export default WarehouseStock;
