import { DataTypes } from "sequelize";
import sequelize from "../connection.db.js";

const UserSubscription = sequelize.define(
  "UserSubscription",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    subscription_id: { type: DataTypes.BIGINT, allowNull: false },
    start_date: { type: DataTypes.DATEONLY, allowNull: true },
    end_date: { type: DataTypes.DATEONLY, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "user_subscriptions",
    timestamps: true,
    underscored: true,
  },
);

export default UserSubscription;
