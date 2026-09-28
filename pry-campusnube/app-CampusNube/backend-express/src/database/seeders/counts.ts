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
};

export const DEFAULT_SEED_COUNTS: SeedCounts = {
  learners: 10,
};

export function resolveSeedCounts(
  argv: string[] = process.argv.slice(2)
): SeedCounts {
  const counts: SeedCounts = { ...DEFAULT_SEED_COUNTS };

  const envLearners = process.env.SEED_LEARNERS;

  if (envLearners !== undefined && envLearners !== "") {
    counts.learners = Number(envLearners);
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
