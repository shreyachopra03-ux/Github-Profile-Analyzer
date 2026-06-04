import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST?.trim(),
  user: process.env.DB_USER?.trim() || 'avnadmin',
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME?.trim() || 'defaultdb',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT.toString().trim()) : 24709,
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000 
};

const pool = mysql.createPool(dbConfig);

export default pool;