import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";


const UserWarehouseAssignment = sequelize.define(
  "UserWarehouseAssignment",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    store_id: { type: DataTypes.BIGINT, allowNull: true },
    warehouse_id: { type: DataTypes.BIGINT, allowNull: false },
    assigned_by: { type: DataTypes.BIGINT, allowNull: true },
  },
  {
    tableName: "user_warehouse_assignments",
    timestamps: true,
    underscored: true,
  },
);

export default UserWarehouseAssignment;
