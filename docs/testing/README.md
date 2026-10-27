# Verification

npm run check runs source/import/route-composition checks, routing HTTP tests and the Vite frontend build. The backend tests use temporary local listeners and test-only probe handlers that are removed after each check; they do not connect to MySQL or register fake handlers in production.

Each owner adds feature success/error cases and relevant business/concurrency tests as implementation proceeds. Member 4 coordinates integration but does not own everyone's tests. The full order workflow and database triggers still need live-MySQL integration tests.
