import { User } from "./user.model";
import { faker } from "@faker-js/faker";

/**
 * Seeder de usuarios (`users`).
 *
 * Crea dos usuarios canónicos que sostienen la demostración de RBAC
 * de CampusNube:
 *
 * | username | password     | rol      |
 * |----------|--------------|----------|
 * | `admin`  | `Admin123!`  | ADMIN    |
 * | `docente`| `Docente123!`| DOCENTE  |
 *
 * Si `count > 2`, se añaden usuarios aleatorios (sin rol asignado):
 * sirven para comprobar que estar autenticado no basta para acceder
 * a operaciones protegidas por RBAC.
 *
 * Las contraseñas se guardan como hash: las hashea el hook `beforeCreate`
 * del modelo. Idempotente por `username`.
 *
 * La asignación de roles se realiza posteriormente en el bloque de
 * RBAC correspondiente.
 */
export const SEED_USERS = [
  {
    username: "admin",
    email: "admin@campusnube.local",
    password: "Admin123!",
  },
  {
    username: "docente",
    email: "docente@campusnube.local",
    password: "Docente123!",
  },
] as const;

export async function seedUsers(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  users: count=0, se omite");
    return 0;
  }

  let created = 0;

  for (const item of SEED_USERS) {
    const [user, wasCreated] = await User.findOrCreate({
      where: { username: item.username },
      defaults: {
        username: item.username,
        email: item.email,
        password: item.password,
        avatar: null,
        status: "active",
      },
    });

    if (wasCreated) {
      created++;
      continue;
    }

    // Reconciliación: reactiva los usuarios canónicos si quedaron inactivos.
    if (user.status !== "active") {
      await user.update({ status: "active" });
    }
  }

  const extras = Math.max(0, count - SEED_USERS.length);

  for (let i = 0; i < extras; i++) {
    const username = `user.${i}.${faker.string.alphanumeric(6)}`.toLowerCase();

    await User.create({
      username,
      email: `${username}@campusnube.local`,
      password: "Password123!",
      avatar: null,
      status: "active",
    });

    created++;
  }

  console.log(
    `✅ users: insertados ${created} usuario(s) (2 canónicos + ${extras} aleatorios)`
  );

  return created;
}
