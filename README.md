# Black Biller — Node.js Backend

A billing and store management system converted from Laravel/PHP to Node.js with Express and Sequelize (PostgreSQL).

---

## Tech Stack

- **Runtime:** Node.js v22+
- **Framework:** Express v5
- **ORM:** Sequelize v6
- **Database:** PostgreSQL
- **Auth:** JWT (converted from Laravel Passport)

---

## Project Structure

```
black biller/
├── src/
│   ├── config/
│   │   └── .env.dev              # Environment variables (git-ignored)
│   │
│   ├── db/
│   │   ├── connection.db.js      # Sequelize instance
│   │   └── models/
│   │       ├── index.js          # ⚠️ All model associations live here
│   │       ├── User.Model.js
│   │       ├── UserRole.Model.js
│   │       ├── UserStore.Model.js
│   │       ├── Store.Model.js
│   │       ├── Warehouse.Model.js
│   │       ├── WarehouseStock.Model.js
│   │       ├── UserWarehouseAssignment.Model.js
│   │       ├── SystemModule.Model.js
│   │       ├── RolePermission.Model.js
│   │       ├── Supplier.Model.js
│   │       ├── SupplierBalance.Model.js
│   │       ├── StoreCounter.Model.js
│   │       ├── StoreConfiguration.Model.js
│   │       ├── StoreAccountSetting.Model.js
│   │       ├── SubscriptionPurchase.Model.js
│   │       ├── UserSubscription.Model.js
│   │       ├── Unit.Model.js
│   │       ├── UnitConversion.Model.js
│   │       ├── Timezone.Model.js
│   │       └── Tax.Model.js
│   │
│   ├── modules/                  # Feature modules (WIP)
│   │   └── {module}/
│   │       ├── {module}.controller.js   # Routes (Express Router)
│   │       └── {module}.service.js      # Business logic (functions)
│   │
│   ├── middlewares/              # WIP — will include:
│   │   ├── authenticate.js       # JWT auth (converted from Passport)
│   │   ├── roleCheck.js          # Role-based access
│   │   ├── roleCodeCheck.js
│   │   ├── roleTypeCheck.js
│   │   └── storeAccess.js        # Store-level access control
│   │
│   ├── utils/                    # Shared helpers
│   ├── app.controller.js         # Express app setup
│   └── index.js                  # Entry point
│
├── .gitignore
├── package.json
└── README.md
```

---

## Architecture

### Models & Associations

All Sequelize models are in `src/db/models/`.

> ⚠️ **All relationships (belongsTo, hasMany, belongsToMany) are defined in `index.js` only** — not inside individual model files. This prevents circular dependency issues.

```js
// Example — how associations are structured in index.js
User.belongsTo(UserRole, { foreignKey: 'role_id', as: 'role' });
UserRole.hasMany(User,   { foreignKey: 'role_id', as: 'users' });
```

Import models always from `index.js`:
```js
import { User, Store, Warehouse } from '../db/models/index.js';
```

---

### Modules (Controller + Service)

Each feature is a module with two files:

| File | Laravel Equivalent | Purpose |
|---|---|---|
| `{module}.controller.js` | `routes/` + `Controller.php` | Defines routes via Express Router |
| `{module}.service.js` | `Service.php` | Contains all business logic functions |

**Example structure:**
```js
// user.controller.js — defines the routes
import { Router } from 'express';
import { getUsers, createUser } from './user.service.js';

const router = Router();
router.get('/',  getUsers);
router.post('/', createUser);
export default router;


// user.service.js — contains the logic
import { User } from '../../db/models/index.js';

export const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json({ success: true, data: users });
};
```

---

### Middlewares (WIP)

Middlewares go in `src/middlewares/` and are applied per-route or globally in `app.controller.js`.

```js
// Example usage in controller
import { authenticate } from '../../middlewares/authenticate.js';
import { roleCheck }    from '../../middlewares/roleCheck.js';

router.get('/stores', authenticate, roleCheck('admin'), getStores);
```

| Middleware | Description |
|---|---|
| `authenticate.js` | Verifies JWT token from `Authorization: Bearer <token>` |
| `roleCheck.js` | Checks user role against allowed roles |
| `roleCodeCheck.js` | Checks by role code |
| `roleTypeCheck.js` | Checks by role type (global/store) |
| `storeAccess.js` | Ensures user has access to requested store |

---

## Setup & Run

### 1. Prerequisites
- Node.js v22+
- PostgreSQL running locally or via Docker

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Create `src/config/.env.dev`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=black_biller
DB_USER=postgres
DB_PASS=yourpassword
PORT=3000
JWT_SECRET=your_secret_key
```

### 4. Run in development
```bash
npm run start:dev
```

> Uses `node --watch` with `--env-file` flag for hot reload.

---

## Database

- PostgreSQL schema is converted from the original Laravel migrations.
- The DB is expected to exist — Sequelize connects to it without running migrations.
- SQL backup files are located in `database/backups/` in the original PHP project.

---

## Status

| Layer | Status |
|---|---|
| DB Connection | ✅ Done |
| Models | ✅ Done (20 models) |
| Model Associations | ✅ Done (`index.js`) |
| Middlewares | 🔄 WIP |
| Modules / Routes | 🔄 WIP |
| Auth (JWT) | 🔄 WIP |
