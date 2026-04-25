import { DataTypes } from "sequelize";
import sequelize  from "../connection.db.js";


const Warehouse = sequelize.define(
  "Warehouse",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    store_id: { type: DataTypes.BIGINT, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    mobile: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "warehouses",
    timestamps: true,
    underscored: true,
  },
);

export default Warehouse;
