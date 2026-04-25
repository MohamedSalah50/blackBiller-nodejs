import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";

const SupplierBalance = sequelize.define(
  "SupplierBalance",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    supplier_id: { type: DataTypes.BIGINT, allowNull: false },
    store_id: { type: DataTypes.BIGINT, allowNull: false },
    purchase_due: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
    purchase_return_due: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
  },
  {
    tableName: "supplier_balances",
    timestamps: true,
    underscored: true,
  },
);

export default SupplierBalance;
