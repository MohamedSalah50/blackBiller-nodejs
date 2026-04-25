import { DataTypes } from "sequelize";
import  sequelize  from "../connection.db.js";


const UserStore = sequelize.define(
  "UserStore",
  {
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    store_id: { type: DataTypes.BIGINT, allowNull: false },
  },
  {
    tableName: "user_stores",
    timestamps: false,
    underscored: true,
  },
);

export default UserStore;
