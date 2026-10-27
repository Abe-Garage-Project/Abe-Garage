# Seeds

The initial Admin/settings seed is implemented at ../../scripts/seed-admin.js and reads INITIAL_ADMIN_* and garage values from backend/.env. No default passwords are provided. Fixed roles are seeded by schema.sql.

Add deterministic synthetic development fixtures when the team needs them. The development seed entry point refuses NODE_ENV=production. Keep separate local and staging databases.
