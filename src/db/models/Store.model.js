import { DataTypes } from "sequelize";
import sequelize  from "../connection.db.js";


const Store = sequelize.define(
  "Store",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    created_by: { type: DataTypes.BIGINT, allowNull: true },
    store_code: { type: DataTypes.STRING, allowNull: true },
    slug: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    website: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    mobile: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    logo: { type: DataTypes.STRING, allowNull: true },
    country_id: { type: DataTypes.BIGINT, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    postcode: { type: DataTypes.STRING, allowNull: true },
    gst_enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
    gst_no: { type: DataTypes.STRING, allowNull: true },
    vat_enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
    vat_no: { type: DataTypes.STRING, allowNull: true },
    pan_no: { type: DataTypes.STRING, allowNull: true },
    default_sales_discount: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
    language_id: { type: DataTypes.BIGINT, allowNull: true },
    currency_id: { type: DataTypes.BIGINT, allowNull: true },
    currency_placement: { type: DataTypes.STRING, allowNull: true },
    timezone_id: { type: DataTypes.BIGINT, allowNull: true },
    date_format: { type: DataTypes.STRING, allowNull: true },
    time_format: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "stores",
    timestamps: true,
    underscored: true,
  },
);

export default Store;
