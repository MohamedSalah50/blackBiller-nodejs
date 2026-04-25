import User from "./User.model.js";
import UserRole from "./UserRole.model.js";
import UserStore from "./UserStore.model.js";
import Store from "./Store.model.js";
import Warehouse from "./Warehouse.model.js";
import UserWarehouseAssignment from "./UserWarehouseAssignment.model.js";
import SystemModule from "./SystemModule.model.js";
import RolePermission from "./RolePermission.model.js";
import WarehouseStock from "./WarehouseStock.Model.js";
import UserSubscription from "./UserSubscription.Model.js";
import Unit from "./Unit.Model.js";
import UnitConversion from "./UnitConversion.Model.js";
import Timezone from "./Timezone.Model.js";
import Tax from "./Tax.Model.js";

import SupplierBalance from "./SupplierBalance.Model.js";
import Supplier from "./Supplier.Model.js";
import SubscriptionPurchase from "./SubscriptionPurchase.Model.js";
import StoreCounter from "./StoreCounter.Model.js";
import StoreConfiguration from "./StoreConfiguration.Model.js";
import StoreAccountSetting from "./StoreAccountSetting.Model.js";

// ─── User <=> UserRole ───────────────────────────────
User.belongsTo(UserRole, { foreignKey: "role_id", as: "role" });
UserRole.hasMany(User, { foreignKey: "role_id", as: "users" });

// ─── User => User (creator) ──────────────────────────
User.belongsTo(User, { foreignKey: "created_by", as: "creator" });

// ─── User <=> Store (many-to-many) ───────────────────
User.belongsToMany(Store, {
  through: UserStore,
  foreignKey: "user_id",
  otherKey: "store_id",
  as: "stores",
});
Store.belongsToMany(User, {
  through: UserStore,
  foreignKey: "store_id",
  otherKey: "user_id",
  as: "users",
});

// ─── Store => Creator ────────────────────────────────
Store.belongsTo(User, { foreignKey: "created_by", as: "creator" });

// ─── Store => Warehouse ──────────────────────────────
Store.hasMany(Warehouse, { foreignKey: "store_id", as: "warehouses" });
Store.hasMany(UserWarehouseAssignment, {
  foreignKey: "store_id",
  as: "warehouseAssignments",
});
Warehouse.belongsTo(Store, { foreignKey: "store_id", as: "store" });

// ─── User <=> Warehouse (many-to-many) ───────────────
User.belongsToMany(Warehouse, {
  through: UserWarehouseAssignment,
  foreignKey: "user_id",
  otherKey: "warehouse_id",
  as: "warehouses",
});
Warehouse.belongsToMany(User, {
  through: UserWarehouseAssignment,
  foreignKey: "warehouse_id",
  otherKey: "user_id",
  as: "users",
});

// ─── UserWarehouseAssignment belongs ─────────────────
UserWarehouseAssignment.belongsTo(User, { foreignKey: "user_id", as: "user" });
UserWarehouseAssignment.belongsTo(User, {
  foreignKey: "assigned_by",
  as: "assignedBy",
});
UserWarehouseAssignment.belongsTo(Store, {
  foreignKey: "store_id",
  as: "store",
});
UserWarehouseAssignment.belongsTo(Warehouse, {
  foreignKey: "warehouse_id",
  as: "warehouse",
});
Warehouse.hasMany(UserWarehouseAssignment, {
  foreignKey: "warehouse_id",
  as: "userAssignments",
});

// ─── UserRole => RolePermission ──────────────────────
UserRole.hasMany(RolePermission, { foreignKey: "role_id", as: "permissions" });
RolePermission.belongsTo(UserRole, { foreignKey: "role_id", as: "role" });

// ─── SystemModule => RolePermission ──────────────────
SystemModule.hasMany(RolePermission, {
  foreignKey: "module_id",
  as: "permissions",
});
RolePermission.belongsTo(SystemModule, {
  foreignKey: "module_id",
  as: "module",
});

WarehouseStock.belongsTo(Warehouse, {
  foreignKey: "warehouse_id",
  as: "warehouse",
});
Warehouse.hasMany(WarehouseStock, { foreignKey: "warehouse_id", as: "stocks" });

UserSubscription.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(UserSubscription, { foreignKey: "user_id", as: "subscriptions" });

Unit.hasMany(UnitConversion, {
  foreignKey: "base_unit_id",
  as: "baseConversions",
});
Unit.hasMany(UnitConversion, {
  foreignKey: "sub_unit_id",
  as: "subConversions",
});
UnitConversion.belongsTo(Unit, { foreignKey: "base_unit_id", as: "baseUnit" });
UnitConversion.belongsTo(Unit, { foreignKey: "sub_unit_id", as: "subUnit" });

Tax.belongsTo(Tax, { foreignKey: "parent_id", as: "parent" });
Tax.hasMany(Tax, { foreignKey: "parent_id", as: "children" });

// Store associations الناقصة
Store.belongsTo(Timezone, { foreignKey: "timezone_id", as: "timezone" });
Timezone.hasMany(Store, { foreignKey: "timezone_id", as: "stores" });

Supplier.belongsTo(Store, { foreignKey: "store_id", as: "store" });
Supplier.belongsTo(User, { foreignKey: "created_by", as: "creator" });
Store.hasMany(Supplier, { foreignKey: "store_id", as: "suppliers" });

SupplierBalance.belongsTo(Supplier, {
  foreignKey: "supplier_id",
  as: "supplier",
});
SupplierBalance.belongsTo(Store, { foreignKey: "store_id", as: "store" });
Supplier.hasOne(SupplierBalance, { foreignKey: "supplier_id", as: "balance" });

StoreCounter.belongsTo(Store, { foreignKey: "store_id", as: "store" });
StoreCounter.belongsTo(User, {
  foreignKey: "assigned_user_id",
  as: "assignedUser",
});
Store.hasMany(StoreCounter, { foreignKey: "store_id", as: "counters" });

SubscriptionPurchase.belongsTo(Store, { foreignKey: "store_id", as: "store" });
SubscriptionPurchase.belongsTo(User, {
  foreignKey: "created_by",
  as: "creator",
});
SubscriptionPurchase.belongsTo(StoreCounter, {
  foreignKey: "counter_id",
  as: "counter",
});
UserSubscription.belongsTo(SubscriptionPurchase, {
  foreignKey: "subscription_id",
  as: "subscription",
});

StoreConfiguration.belongsTo(Store, { foreignKey: "store_id", as: "store" });
StoreConfiguration.belongsTo(Warehouse, {
  foreignKey: "default_warehouse_id",
  as: "defaultWarehouse",
});
Store.hasOne(StoreConfiguration, {
  foreignKey: "store_id",
  as: "configuration",
});

StoreAccountSetting.belongsTo(Store, { foreignKey: "store_id", as: "store" });
StoreAccountSetting.belongsTo(User, { foreignKey: "user_id", as: "user" });
Store.hasMany(StoreAccountSetting, {
  foreignKey: "store_id",
  as: "accountSettings",
});

export {
  User,
  UserRole,
  UserStore,
  Store,
  Warehouse,
  UserWarehouseAssignment,
  SystemModule,
  RolePermission,
  WarehouseStock,
  UserSubscription,
  Unit,
  UnitConversion,
  Timezone,
  Tax,
  SupplierBalance,
  Supplier,
  SubscriptionPurchase,
  StoreCounter,
  StoreConfiguration,
  StoreAccountSetting,
};
