import bcrypt from 'bcryptjs';

import { pool, withTransaction } from '../src/config/db.js';
import { env } from '../src/config/env.js';

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error('Set ' + name + ' in backend/.env');
  return value;
}

const password = process.env.INITIAL_ADMIN_PASSWORD || '';
if (password.length < 8 || Buffer.byteLength(password) > 72)
  throw new Error(
    'INITIAL_ADMIN_PASSWORD must have at least 8 characters and at most 72 UTF-8 bytes',
  );
const email = required('INITIAL_ADMIN_EMAIL').toLowerCase();
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('INITIAL_ADMIN_EMAIL is invalid');
const firstName = required('INITIAL_ADMIN_FIRST_NAME'),
  lastName = required('INITIAL_ADMIN_LAST_NAME'),
  phone = required('INITIAL_ADMIN_PHONE');
const garage = [
  required('GARAGE_NAME'),
  required('GARAGE_ADDRESS'),
  required('GARAGE_PHONE'),
  required('GARAGE_EMAIL').toLowerCase(),
];
const passwordHash = await bcrypt.hash(password, 12);
const database = { transaction: withTransaction, close: () => pool.end() };
try {
  const result = await database.transaction(async (connection) => {
    const [roles] = await connection.execute(
      'SELECT role_id FROM roles WHERE role_id = 3 FOR UPDATE',
    );
    if (!roles.length) throw new Error('Import backend/db/schema.sql into an empty database first');
    const [admins] = await connection.execute(
      'SELECT employee_id FROM employees WHERE role_id = 3 AND active = 1 LIMIT 1 FOR UPDATE',
    );
    if (!admins.length)
      await connection.execute(
        'INSERT INTO employees (email, first_name, last_name, phone, password_hash, role_id) VALUES (?, ?, ?, ?, ?, 3)',
        [email, firstName, lastName, phone, passwordHash],
      );
    const [settings] = await connection.execute(
      'SELECT settings_id FROM garage_settings WHERE settings_id = 1 FOR UPDATE',
    );
    if (!settings.length)
      await connection.execute(
        'INSERT INTO garage_settings (settings_id, name, address, phone, email, currency) VALUES (1, ?, ?, ?, ?, ?)',
        [...garage, env.currency],
      );
    return { adminCreated: !admins.length, settingsCreated: !settings.length };
  });
  console.log('Seed complete:', result, 'Existing Admin/settings were not overwritten.');
} catch (error) {
  console.error(
    'Seed failed:',
    error.code || error.name,
    error.code ? 'Check schema and uniqueness constraints.' : error.message,
  );
  process.exitCode = 1;
} finally {
  await database.close();
}
