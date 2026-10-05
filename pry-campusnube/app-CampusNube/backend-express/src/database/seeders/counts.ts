/**
 * Cantidad de registros por tabla.
 *
 * Prioridad:
 * CLI (--learners=N)
 * >
 * env (SEED_LEARNERS)
 * >
 * default de este archivo.
 *
 * Los catálogos de seguridad:
 * roles, resources, role_users y resource_roles
 * son deterministas y no tienen conteo.
 *
 * refresh_tokens no tiene seeder:
 * lo puebla el login.
 *
 * Cuando agregues features, suma aquí la clave
 * correspondiente y léela en el SeedersRunner.
 */

export type SeedCounts = {
  users: number;
  learners: number;
  teachers: number;
  courses: number;
  modules: number;
  lessons: number;
  enrollments: number;
  evaluations: number;
  attempts: number;
  submissions: number;
  progress: number;
  certificates: number;
};

export const DEFAULT_SEED_COUNTS: SeedCounts = {
  // ==========================================================
  // Fase II — Auth
  // ==========================================================
  users: 2,

  // ==========================================================
  // Fase I — Business CampusNube
  // ==========================================================
  learners: 20,
  teachers: 5,
  courses: 10,
  modules: 20,
  lessons: 40,
  enrollments: 30,
  evaluations: 10,
  attempts: 20,
  submissions: 20,
  progress: 30,
  certificates: 10,
};

export function resolveSeedCounts(
  argv: string[] = process.argv.slice(2)
): SeedCounts {
  const counts: SeedCounts = {
    ...DEFAULT_SEED_COUNTS,
  };

  const envMap: Array<
    [keyof SeedCounts, string | undefined]
  > = [
    ["users", process.env.SEED_USERS],
    ["learners", process.env.SEED_LEARNERS],
    ["teachers", process.env.SEED_TEACHERS],
    ["courses", process.env.SEED_COURSES],
    ["modules", process.env.SEED_MODULES],
    ["lessons", process.env.SEED_LESSONS],
    ["enrollments", process.env.SEED_ENROLLMENTS],
    ["evaluations", process.env.SEED_EVALUATIONS],
    ["attempts", process.env.SEED_ATTEMPTS],
    ["submissions", process.env.SEED_SUBMISSIONS],
    ["progress", process.env.SEED_PROGRESS],
    ["certificates", process.env.SEED_CERTIFICATES],
  ];

  for (const [key, value] of envMap) {
    if (value !== undefined && value !== "") {
      counts[key] = Number(value);
    }
  }

  for (const arg of argv) {
    const match = arg.match(
      /^--([a-zA-Z_]+)=(\d+)$/
    );

    if (!match) {
      continue;
    }

    const key = match[1] as keyof SeedCounts;
    const value = Number(match[2]);

    if (key in counts) {
      counts[key] = value;
    }
  }

  return counts;
}
