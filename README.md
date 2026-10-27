# Abe Garage

Shared project foundation for our four-person team. This hybrid keeps the planned module folders, 30 frontend page files, API task documents and normalized database, while leaving feature implementations to their owners.

## Ready to reuse

- Express entry point, MySQL pool and transaction helper.
- One main router mounted at /api, following the forum project.
- Shared error, token/role, validation and rate-limit middleware.
- Initial Admin/settings seed command and normalized 14-table SQL schema.
- React/Vite page placeholders, layouts, controls and a shared API client.
- Routing tests, source checks and CI.

## Team implementation

Controllers, services and validators contain comments and empty exports. Route files are empty Express routers with comments listing planned paths. Generated endpoint handlers, frontend API wrappers and dummy feature components have been removed. All module folders and page files remain.

Only GET /api/health is implemented. Planned APIs return 404 until their owners register real handlers. No function names, controller wrappers or component breakdown are imposed. Preserve shared API behavior, permissions and database rules.

## Routing

1. backend/index.js mounts mainRouter at /api.
2. backend/src/api/routes.js mounts resource prefixes, such as /auth.
3. auth/routes/auth.route.js defines local paths, such as /login.

Result: POST /api/auth/login. [See routing examples](docs/ROUTING.md).

## Setup

Use Node.js 22.12+ and npm 10+. From this folder:

```powershell
npm ci
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

Fill in the MySQL credentials, INITIAL*ADMIN*\* fields and garage contact fields in backend/.env. Generate a random JWT_SECRET of at least 32 characters locally:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Create an empty MySQL database and execute backend/db/schema.sql in MySQL CLI/Workbench. Set DB_NAME to that database. Then:

```bash
npm run seed:admin
npm run dev
```

Frontend: http://localhost:5173. API: http://localhost:5000/api. The backend entry point is backend/index.js. The seed creates initial Admin/settings without overwriting an existing active Admin or settings; login is still a team task. Readiness returns 503 until the database/schema/initial records are ready.

## Checks

```bash
npm run check
```

This checks source imports, JS syntax, documented route composition, actual Express routing/errors and the frontend production build. Routing tests require no .env or MySQL connection. Run database/seed integration separately against your local database.

There are no mandatory lint/format rules for feature implementations. Keep changes readable and review them as a team. The root lockfile keeps dependencies consistent.

## References

- [Team agreements and freedom](docs/TEAM-GUIDE.md)
- [Routing guide](docs/ROUTING.md)
- [Task classifications](docs/api/TASK-CLASSIFICATION.md)
- [Endpoint contracts](docs/api/README.md)
- [Current normalized database mapping](docs/database/README.md)
- [Authoritative schema](backend/db/schema.sql)

The normalized database mapping supersedes the older ten-table proposal in the task package. Public registration, Google sign-in, /me and /v1 remain outside the agreed design. Historical task instructions suggest internal names; they do not require copying the generated implementation style.
