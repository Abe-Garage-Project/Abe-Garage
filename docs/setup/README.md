# Setup

Follow the project root README for npm ci, local environment files, MySQL schema import and the initial seed command. The executable entry point is backend/index.js; all resource mounts are in backend/src/api/routes.js.

Each developer uses a local database. The committed normalized schema has 14 tables and is a fresh-database baseline, not an upgrade script. Business controllers/services are intentionally empty. No default credentials are provided.
