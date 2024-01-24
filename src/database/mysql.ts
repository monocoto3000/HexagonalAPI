import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { Signale } from "signale";

dotenv.config();
const signale = new Signale();

// configuracion de la bd

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
};

// Crear el pool de conexiones
const pool = mysql.createPool(config);

// Un pool de conexiones mantiene un número de conexiones a la base datos abiertas y este número 
// puede variar dependiendo de la carga del servicio

// Un pool de conexiones de base de datos almacena conexiones de base de datos listas para usar 
// Los hilos de una aplicación pueden tomarlas prestadas cuando las necesiten y devolverlas cuando 
// terminan el trabajo con la base de datos.

export async function query(sql: string, params: any[]) {
  try {
    const conn = await pool.getConnection();
    signale.success("Conexión exitosa a la BD");
    const result = await conn.execute(sql, params);

    // libera la conexion de la bd para que pueda ser utilizada por otros procesos
    
    conn.release();
    return result;
  } catch (error) {
    signale.error(error);
    return null;
  }
}
