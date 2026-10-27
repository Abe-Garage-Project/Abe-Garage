import { pool } from '../src/config/db.js';
try {
  await pool.query({ sql: 'SELECT 1', timeout: 3000 });
  console.log('Database connection successful');
} catch {
  console.error('Database connection failed. Check backend/.env and MySQL availability.');
  process.exitCode = 1;
} finally {
  await pool.end();
}
