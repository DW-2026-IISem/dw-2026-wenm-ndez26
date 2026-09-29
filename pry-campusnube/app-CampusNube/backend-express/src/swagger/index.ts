import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import { learnerSwagger } from "../features/business/learner/learner.swagger";
import { teacherSwagger } from "../features/business/teacher/teacher.swagger";
import { courseSwagger } from "../features/business/course/course.swagger";
import { enrollmentSwagger } from "../features/business/enrollment/enrollment.swagger";
import { evaluationSwagger } from "../features/business/evaluation/evaluation.swagger";

export type FeatureSwaggerModule = {
  tags: unknown[];
  paths: Record<string, unknown>;
  components?: {
    schemas?: Record<string, unknown>;
  };
};

/**
 * Registry externo: importa la documentación OpenAPI
 * de cada feature.
 */
const featureSwaggerModules: FeatureSwaggerModule[] = [
  learnerSwagger,
  teacherSwagger,
  courseSwagger,
  enrollmentSwagger,
  evaluationSwagger,
];

export function buildOpenApiDocument() {
  const tags: unknown[] = [];
  const paths: Record<string, unknown> = {};
  const schemas: Record<string, unknown> = {};

  for (const mod of featureSwaggerModules) {
    tags.push(...mod.tags);
    Object.assign(paths, mod.paths);

    if (mod.components?.schemas) {
      Object.assign(schemas, mod.components.schemas);
    }
  }

  return {
    openapi: "3.0.3",

    info: {
      title: "CampusNube API",
      version: "1.0.0",
      description:
        "API CampusNube — Aprendizaje virtual. Los endpoints de Learner están documentados como SIN AUTH.",
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4000}`,
        description: "Local",
      },
    ],

    tags,
    paths,

    components: {
      schemas,
    },
  };
}

/**
 * Monta Swagger UI y el documento JSON OpenAPI.
 */
export function setupSwagger(app: Application): void {
  const document = buildOpenApiDocument();

  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(document)
  );

  app.get("/api/docs.json", (_req, res) => {
    res.json(document);
  });

  console.log(
    "📘 Swagger UI: /api/docs | OpenAPI JSON: /api/docs.json"
  );
}
