import dotenv from "dotenv";
import mysql from 'mysql2/promise';
dotenv.config();

export const pool = mysql.createPool(process.env.DATABASE_URL!);
