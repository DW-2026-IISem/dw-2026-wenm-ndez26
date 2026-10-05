import dotenv from "dotenv";
import express, { Application, ErrorRequestHandler } from "express";
import morgan from "morgan";
var cors = require("cors");

import { sequelize, getDatabaseInfo, testConnection } from "../database/db";

// ============================================================
// Fase I — Business: modelos
// ============================================================
import "../features/business/learner/learner.model";
import "../features/business/teacher/teacher.model";
import "../features/business/course/course.model";
import "../features/business/module/module.model";
import "../features/business/lesson/lesson.model";
import "../features/business/enrollment/enrollment.model";
import "../features/business/evaluation/evaluation.model";
import "../features/business/attempt/attempt.model";
import "../features/business/submission/submission.model";
import "../features/business/progress/progress.model";
import "../features/business/certificate/certificate.model";

// ============================================================
// Fase I — Business: asociaciones
// ============================================================
import "../features/business/enrollment/enrollment.associations";
import "../features/business/course/course.associations";
import "../features/business/module/module.associations";
import "../features/business/lesson/lesson.associations";
import "../features/business/evaluation/evaluation.associations";
import "../features/business/attempt/attempt.associations";
import "../features/business/submission/submission.associations";
import "../features/business/progress/progress.associations";
import "../features/business/certificate/certificate.associations";

// ============================================================
// Fase II — Auth con RBAC
// Primero los modelos, después las asociaciones.
// Las asociaciones referencian los modelos, no al revés.
// ============================================================
import "../features/auth/users/user.model";
import "../features/auth/roles/role.model";
import "../features/auth/resources/resource.model";
import "../features/auth/role-users/role-user.model";
import "../features/auth/resource-roles/resource-role.model";
import "../features/auth/refresh-tokens/refresh-token.model";
import "../features/auth/rbac.associations";

import { Routes } from "../routes/index";
import { setupSwagger } from "../swagger/index";

dotenv.config();

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.docs();
    this.errorHandling();
  }

  private settings(): void {
    this.app.set("port", this.port || process.env.PORT || 4000);
  }

  private middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
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

  private docs(): void {
    setupSwagger(this.app);
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
  private errorHandling(): void {
    const bodyErrorHandler: ErrorRequestHandler = (
      err,
      _req,
      res,
      next
    ) => {
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

  private async dbConnection(): Promise<void> {
    try {
      const dbInfo = getDatabaseInfo();

      console.log(
        `🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()}`
      );

      const isConnected = await testConnection();

      if (!isConnected) {
        throw new Error(
          `No se pudo conectar a la base de datos ${dbInfo.engine.toUpperCase()}`
        );
      }

      // Lab: sync crea/altera tablas desde los modelos.
      // BD limpia → snake_case desde cero.
      const force = process.env.DB_SYNC_FORCE === "true";

      const isMysql =
        sequelize.getDialect() === "mysql" ||
        sequelize.getDialect() === "mariadb";

      if (isMysql) {
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
      }

      try {
        await sequelize.sync({
          force,
          alter: !force,
        });
      } finally {
        if (isMysql) {
          await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
        }
      }

      console.log(
        force
          ? "📦 Base de datos recreada (DB_SYNC_FORCE=true)"
          : "📦 Base de datos sincronizada exitosamente"
      );
    } catch (error) {
      console.error(
        "❌ Error al conectar con la base de datos:",
        error
      );
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

    console.log(
      `🚀 Servidor ejecutándose en puerto ${this.app.get("port")}`
    );
  }
}
