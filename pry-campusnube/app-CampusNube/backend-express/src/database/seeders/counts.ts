/**
 * Cantidad de registros por feature/entidad.
 *
 * Prioridad:
 * CLI (--learners=N) > env (SEED_LEARNERS) > default.
 *
 * Cuando agreguemos las otras entidades de CampusNube,
 * añadiremos sus respectivas claves aquí.
 */
export type SeedCounts = {
  learners: number;
  teachers: number;
  courses: number;
  enrollments: number;
  evaluations: number;
  modules: number;
  lessons: number;
  attempts: number;
};

export const DEFAULT_SEED_COUNTS: SeedCounts = {
  learners: 10,
  teachers: 10,
  courses: 10,
  enrollments: 20,
  evaluations: 10,
  modules: 10,
  lessons: 10,
  attempts: 10
};

export function resolveSeedCounts(
  argv: string[] = process.argv.slice(2)
): SeedCounts {
  const counts: SeedCounts = { ...DEFAULT_SEED_COUNTS };

  const envLearners = process.env.SEED_LEARNERS;

  if (envLearners !== undefined && envLearners !== "") {
    counts.learners = Number(envLearners);
  }

  const envTeachers = process.env.SEED_TEACHERS;

  if (envTeachers !== undefined && envTeachers !== "") {
    counts.teachers = Number(envTeachers);
  }

  const envCourses = process.env.SEED_COURSES;

  if (envCourses !== undefined && envCourses !== "") {
    counts.courses = Number(envCourses);
  }

  const envEnrollments = process.env.SEED_ENROLLMENTS;

  if (envEnrollments !== undefined && envEnrollments !== "") {
    counts.enrollments = Number(envEnrollments);
  }

  const envEvaluations = process.env.SEED_EVALUATIONS;

if (envEvaluations !== undefined && envEvaluations !== "") {
  counts.evaluations = Number(envEvaluations);
}

const envModules = process.env.SEED_MODULES;

if (envModules !== undefined && envModules !== "") {
  counts.modules = Number(envModules);
}

const envLessons = process.env.SEED_LESSONS;

if (envLessons !== undefined && envLessons !== "") {
  counts.lessons = Number(envLessons);
}

const envAttempts = process.env.SEED_ATTEMPTS;

if (envAttempts !== undefined && envAttempts !== "") {
  counts.attempts = Number(envAttempts);
}

  for (const arg of argv) {
    const m = arg.match(/^--([a-zA-Z_]+)=(\d+)$/);

    if (!m) continue;

    const key = m[1] as keyof SeedCounts;
    const value = Number(m[2]);

    if (key in counts) {
      counts[key] = value;
    }
  }

  return counts;
}