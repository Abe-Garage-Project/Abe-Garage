import mysql from 'mysql2/promise';
import { env } from './env.js';

export const pool = mysql.createPool({
  ...env.db,
  timezone: 'Z',
  dateStrings: true,
  decimalNumbers: false,
  multipleStatements: false,
  waitForConnections: true,
  queueLimit: 0,
});

// All DATETIME writes must be UTC. Services use UTC strings or explicit UTC_TIMESTAMP(6).
// Run queries on this acquired connection, not pool.execute, during a transaction.
export async function withTransaction(work) {
  const connection = await pool.getConnection();
  try {
    await connection.query("SET time_zone = '+00:00'");
    await connection.beginTransaction();
    const result = await work(connection);
    await connection.commit();
    return result;
  } catch (error) {
    try {
      await connection.rollback();
    } catch {
      /* Preserve original failure. */
    }
    throw error;
  } finally {
    connection.release();
  }
}
