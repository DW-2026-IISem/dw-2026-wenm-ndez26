"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
exports.getDatabaseInfo = getDatabaseInfo;
exports.testConnection = testConnection;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configs = {
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
exports.sequelize = new sequelize_1.Sequelize(selectedConfig.database, selectedConfig.username, selectedConfig.password, {
    host: selectedConfig.host,
    port: selectedConfig.port,
    dialect: selectedEngine,
    logging: false
});
function getDatabaseInfo() {
    return {
        engine: selectedEngine,
        host: selectedConfig.host,
        port: selectedConfig.port,
        database: selectedConfig.database
    };
}
async function testConnection() {
    try {
        await exports.sequelize.authenticate();
        console.log('✅ Conexión a la base de datos exitosa');
        return true;
    }
    catch (error) {
        console.error('❌ Error de conexión a la base de datos:', error);
        return false;
    }
}
//# sourceMappingURL=db.js.map