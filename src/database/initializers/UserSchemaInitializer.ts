import mysql from "mysql2/promise";
import { config } from "../mysql";
import { Signale } from "signale";

const signale = new Signale();

const tableName = 'user';
const tableColumns = [
    'id INT AUTO_INCREMENT PRIMARY KEY',
    'name VARCHAR(255)',
    'last_name VARCHAR(255)',
    'second_last_name VARCHAR(255)',
    'username VARCHAR(255)',
    'email VARCHAR(255)',
    'password VARCHAR(255)',
    'birthday VARCHAR(255)',
    'age INT',
    'registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
];

async function UserInitializeSchema() {
    try {
      const connection = await mysql.createConnection(config); 
      console.log('Conexión exitosa a la BD');
      const createTable = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableColumns.join(', ')})`;
      await connection.query(createTable); 
      signale.success('Tabla creada con exito :D');
      connection.end(); 
    } catch (error) {
      signale.error('Error al inicializar el esquema:', error);
    }
  }
  
  UserInitializeSchema();

//   Comando para compilar este documento ->  npm run start:schema