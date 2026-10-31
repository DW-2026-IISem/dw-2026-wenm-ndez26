"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
var cors = require("cors");
const db_1 = require("../database/db");
// ============================================================
// Fase I — Business: modelos
// ============================================================
require("../features/business/learner/learner.model");
require("../features/business/teacher/teacher.model");
require("../features/business/course/course.model");
require("../features/business/module/module.model");
require("../features/business/lesson/lesson.model");
require("../features/business/enrollment/enrollment.model");
require("../features/business/evaluation/evaluation.model");
require("../features/business/attempt/attempt.model");
require("../features/business/submission/submission.model");
require("../features/business/progress/progress.model");
require("../features/business/certificate/certificate.model");
// ============================================================
// Fase I — Business: asociaciones
// ============================================================
require("../features/business/enrollment/enrollment.associations");
require("../features/business/course/course.associations");
require("../features/business/module/module.associations");
require("../features/business/lesson/lesson.associations");
require("../features/business/evaluation/evaluation.associations");
require("../features/business/attempt/attempt.associations");
require("../features/business/submission/submission.associations");
require("../features/business/progress/progress.associations");
require("../features/business/certificate/certificate.associations");
// ============================================================
// Fase II — Auth con RBAC
// Primero los modelos, después las asociaciones.
// Las asociaciones referencian los modelos, no al revés.
// ============================================================
require("../features/auth/users/user.model");
require("../features/auth/roles/role.model");
require("../features/auth/resources/resource.model");
require("../features/auth/role-users/role-user.model");
require("../features/auth/resource-roles/resource-role.model");
require("../features/auth/refresh-tokens/refresh-token.model");
require("../features/auth/rbac.associations");
const index_1 = require("../routes/index");
const index_2 = require("../swagger/index");
dotenv_1.default.config();
class App {
    constructor(port) {
        this.port = port;
        this.routePrv = new index_1.Routes();
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
        this.docs();
        this.errorHandling();
    }
    settings() {
        this.app.set("port", this.port || process.env.PORT || 4000);
    }
    middlewares() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(cors());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        // ========================================================
        // Fase I — Business
        // Todas las operaciones de negocio usan JWT + RBAC.
        // ========================================================
        this.routePrv.learnerRoutes.routes(this.app);
        this.routePrv.teacherRoutes.routes(this.app);
        this.routePrv.courseRoutes.routes(this.app);
        this.routePrv.moduleRoutes.routes(this.app);
        this.routePrv.lessonRoutes.routes(this.app);
        this.routePrv.enrollmentRoutes.routes(this.app);
        this.routePrv.evaluationRoutes.routes(this.app);
        this.routePrv.attemptRoutes.routes(this.app);
        this.routePrv.submissionRoutes.routes(this.app);
        this.routePrv.progressRoutes.routes(this.app);
        this.routePrv.certificateRoutes.routes(this.app);
        // ========================================================
        // Fase II — Auth con RBAC
        //
        // sessionRoutes registra los endpoints OPEN/JWT:
        // login, refresh, logout, perfil y permisos.
        //
        // El resto de features de administración de seguridad
        // utilizan JWT + RBAC.
        // ========================================================
        this.routePrv.sessionRoutes.routes(this.app);
        this.routePrv.refreshTokensRoutes.routes(this.app);
        this.routePrv.usersRoutes.routes(this.app);
        this.routePrv.rolesRoutes.routes(this.app);
        this.routePrv.resourcesRoutes.routes(this.app);
        this.routePrv.roleUsersRoutes.routes(this.app);
        this.routePrv.resourceRolesRoutes.routes(this.app);
    }
    docs() {
        (0, index_2.setupSwagger)(this.app);
    }
    /**
     * Errores que ocurren antes de llegar a un controller o middleware.
     *
     * El caso típico es un cuerpo JSON malformado: express.json()
     * lanza un SyntaxError que, sin manejador, cae en el de Express
     * por defecto y responde 400 con HTML.
     *
     * Aquí se traduce a un 400 JSON limpio.
     *
     * Debe registrarse después de las rutas: Express reconoce un
     * middleware de error por su aridad de 4 argumentos.
     */
    errorHandling() {
        const bodyErrorHandler = (err, _req, res, next) => {
            if (err instanceof SyntaxError && "body" in err) {
                res.status(400).json({
                    error: "Malformed JSON body",
                });
                return;
            }
            next(err);
        };
        this.app.use(bodyErrorHandler);
    }
    async dbConnection() {
        try {
            const dbInfo = (0, db_1.getDatabaseInfo)();
            console.log(`🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()}`);
            const isConnected = await (0, db_1.testConnection)();
            if (!isConnected) {
                throw new Error(`No se pudo conectar a la base de datos ${dbInfo.engine.toUpperCase()}`);
            }
            // Lab: sync crea/altera tablas desde los modelos.
            // BD limpia → snake_case desde cero.
            const force = process.env.DB_SYNC_FORCE === "true";
            const isMysql = db_1.sequelize.getDialect() === "mysql" ||
                db_1.sequelize.getDialect() === "mariadb";
            if (isMysql) {
                await db_1.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
            }
            try {
                await db_1.sequelize.sync({
                    force,
                    alter: !force,
                });
            }
            finally {
                if (isMysql) {
                    await db_1.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
                }
            }
            console.log(force
                ? "📦 Base de datos recreada (DB_SYNC_FORCE=true)"
                : "📦 Base de datos sincronizada exitosamente");
        }
        catch (error) {
            console.error("❌ Error al conectar con la base de datos:", error);
            process.exit(1);
        }
    }
    async listen() {
        // Orden de arranque:
        // primero la BD (conexión + sync), después abrir el puerto.
        //
        // Si se abre el puerto antes de terminar sync({ alter: true }),
        // las sentencias DDL pueden competir con las peticiones que ya
        // están entrando y provocar errores intermitentes.
        await this.dbConnection();
        await this.app.listen(this.app.get("port"));
        console.log(`🚀 Servidor ejecutándose en puerto ${this.app.get("port")}`);
    }
}
exports.App = App;
//# sourceMappingURL=index.js.map