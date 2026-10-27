# Routing follows the forum project

The entry point imports only the main API router:

```js
// backend/index.js
import { mainRouter } from './src/api/routes.js';
app.use('/api', mainRouter);
```

Resource prefixes belong in the main router:

```js
// backend/src/api/routes.js
import authRoutes from './auth/routes/auth.route.js';
mainRouter.use('/auth', authRoutes);
```

Once you implement the actual handlers, add local paths in the feature router:

```js
// backend/src/api/auth/routes/auth.route.js
import { login } from '../controller/auth.controller.js';
import { validateLogin } from '../validations/auth.validation.js';

router.post('/login', validateLogin, login);
```

Result: `POST /api/auth/login`. Do not repeat `/api` or `/auth` inside the auth route file. The names above are examples, not required names.

| Main prefix         | Local path               | Full endpoint                          |
| ------------------- | ------------------------ | -------------------------------------- |
| `/customers`        | `/:customer_id`          | `/api/customers/:customer_id`          |
| `/customers`        | `/:customer_id/vehicles` | `/api/customers/:customer_id/vehicles` |
| `/orders` (billing) | `/:order_id/invoice`     | `/api/orders/:order_id/invoice`        |
| `/public/services`  | `/`                      | `/api/public/services`                 |
| `/public/orders`    | `/:order_hash`           | `/api/public/orders/:order_hash`       |
| `/profile`          | `/`                      | `/api/profile`                         |
| `/my-jobs`          | `/`                      | `/api/my-jobs`                         |
| `/` (setup)         | `/health`                | `/api/health`                          |

Order management, billing and notifications may each extend `/orders` through separate routers. Avoid broad catch-all handlers that prevent a later router from handling a request; unhandled paths should fall through to the central 404.

Currently only `/api/health` is registered. Route comments list planned paths but do not register fake endpoints. Other requests return 404 until real handlers are added. No 501 placeholder services remain.
