# Backend

Entry point: index.js. It registers shared middleware and mounts only mainRouter at /api.

src/api/routes.js imports feature routers and mounts their prefixes. Feature .route.js files declare local paths: auth is mounted at /auth and its login path is /login.

Module folders remain. Controllers, services and validators are intentionally empty. Choose your own function names and implementation; import handlers only after creating them. Shared middleware/helpers do not prescribe controller/service signatures. Preserve centralized errors and server-side permissions.

Setup/readiness is the only active route. Initial Admin/settings CLI is implemented; the installation HTTP endpoint is still planned. Run npm run dev:backend from the root or npm run dev here. Node's built-in watch mode replaces nodemon.

npm test runs routing/error checks without MySQL. Import app from index.js in tests; its direct-execution guard avoids starting a server during imports.

Read ../docs/TEAM-GUIDE.md, ../docs/ROUTING.md and ../docs/database/README.md. The normalized schema is db/schema.sql.
