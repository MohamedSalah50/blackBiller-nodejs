import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";

const StoreAccountSetting = sequelize.define(
  "StoreAccountSetting",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    store_id: { type: DataTypes.BIGINT, allowNull: false },
    account_name: { type: DataTypes.STRING, allowNull: true },
    bank_name: { type: DataTypes.STRING, allowNull: true },
    account_number: { type: DataTypes.STRING, allowNull: true },
    ifsc_code: { type: DataTypes.STRING, allowNull: true },
    upi_id: { type: DataTypes.STRING, allowNull: true },
    balance: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
    user_id: { type: DataTypes.BIGINT, allowNull: true },
  },
  {
    tableName: "store_account_settings",
    timestamps: true,
    underscored: true,
  },
);

export default StoreAccountSetting;
