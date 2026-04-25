import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";

const SubscriptionPurchase = sequelize.define(
  "SubscriptionPurchase",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    store_id: { type: DataTypes.BIGINT, allowNull: true },
    package_id: { type: DataTypes.BIGINT, allowNull: true },
    counter_id: { type: DataTypes.BIGINT, allowNull: true },
    created_by: { type: DataTypes.BIGINT, allowNull: true },
    subscription_code: { type: DataTypes.STRING, allowNull: true },
    start_date: { type: DataTypes.DATEONLY, allowNull: true },
    end_date: { type: DataTypes.DATEONLY, allowNull: true },
    amount: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
    payment_type_id: { type: DataTypes.BIGINT, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "subscription_purchase",
    timestamps: true,
    underscored: true,
  },
);

export default SubscriptionPurchase;
