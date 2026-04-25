import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";

const Supplier = sequelize.define(
  "Supplier",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    store_id: { type: DataTypes.BIGINT, allowNull: true },
    created_by: { type: DataTypes.BIGINT, allowNull: true },
    country_id: { type: DataTypes.BIGINT, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    supplier_code: { type: DataTypes.STRING, allowNull: true },
    supplier_name: { type: DataTypes.STRING, allowNull: false },
    mobile: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    gstin: { type: DataTypes.STRING, allowNull: true },
    vatin: { type: DataTypes.STRING, allowNull: true },
    postcode: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "suppliers",
    timestamps: true,
    underscored: true,
  },
);

export default Supplier;
