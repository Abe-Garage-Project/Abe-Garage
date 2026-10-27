import { pool } from '../../../config/db.js';
import { AppError } from '../../../utils/errors/index.js';

export async function healthService() {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query({
      sql: 'SELECT (SELECT COUNT(*) FROM roles) AS roles_count, (SELECT COUNT(*) FROM garage_settings WHERE settings_id = 1) AS settings_count, (SELECT COUNT(*) FROM employees WHERE role_id = 3 AND active = 1) AS admin_count',
      timeout: 3000,
    });
    if (rows[0].roles_count !== 3 || rows[0].settings_count !== 1 || rows[0].admin_count < 1)
      throw new Error('Not initialized');
    await connection.query({ sql: 'SELECT order_id FROM v_orders LIMIT 0', timeout: 3000 });
    return { service: 'abe-garage-api', ready: true };
  } catch {
    throw new AppError('Service unavailable', 503, { ready: false });
  } finally {
    connection?.release();
  }
}
