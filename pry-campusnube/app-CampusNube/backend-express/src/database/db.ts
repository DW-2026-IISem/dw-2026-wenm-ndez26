import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const configs: Record<string, DatabaseConfig> = {
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT) || 3306,
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_NAME || 'campusnube'
  },
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_NAME || 'campusnube'
  }
};

const selectedEngine = (process.env.DB_ENGINE || 'mysql').toLowerCase();
const selectedConfig = configs[selectedEngine];

if (!selectedConfig) {
  throw new Error(`Motor de base de datos no soportado: ${selectedEngine}`);
}

export const sequelize = new Sequelize(
  selectedConfig.database,
  selectedConfig.username,
  selectedConfig.password,
  {
    host: selectedConfig.host,
    port: selectedConfig.port,
    dialect: selectedEngine as 'mysql' | 'postgres',
    logging: false
  }
);

export function getDatabaseInfo() {
  return {
    engine: selectedEngine,
    host: selectedConfig.host,
    port: selectedConfig.port,
    database: selectedConfig.database
  };
}

export async function testConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('❌ Error de conexión a la base de datos:', error);
    throw error;
  }
}
