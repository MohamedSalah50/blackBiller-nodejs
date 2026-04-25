import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";

const StoreConfiguration = sequelize.define(
  "StoreConfiguration",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    store_id: { type: DataTypes.BIGINT, allowNull: false },
    currency_id: { type: DataTypes.BIGINT, allowNull: true },
    invoice_prefix: { type: DataTypes.STRING, allowNull: true },
    order_prefix: { type: DataTypes.STRING, allowNull: true },
    payment_reference_prefix: { type: DataTypes.STRING, allowNull: true },
    tax_behavior: { type: DataTypes.STRING, allowNull: true },
    default_warehouse_id: { type: DataTypes.BIGINT, allowNull: true },
    default_sales_discount: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
    accounting_defaults: { type: DataTypes.JSONB, allowNull: true }, // بديل cast array
  },
  {
    tableName: "store_configurations",
    timestamps: true,
    underscored: true,
  },
);

export default StoreConfiguration;
