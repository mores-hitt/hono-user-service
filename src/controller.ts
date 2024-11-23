import { createFactory } from "hono/factory";
import * as schema from "./user";
import { db } from "./database/db";
import { eq, asc, and } from "drizzle-orm";
import * as bcrypt from "bcryptjs";

const factory = createFactory();

class userController {
  public createUser = factory.createHandlers(async (c) => {
    const { Nombre, Correo, Apellidos, Contrasenia } = await c.req.json();
    const existingUsers = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.Correo, Correo));
    //Si el usuario que se quiere crear ya existe y esta eliminado, se actualiza y se cambia el estado a no eliminado
    if (existingUsers.length === 1 && existingUsers[0].EstaEliminado) {
      const hashedPassword = await bcrypt.hash(Contrasenia, 10);
      await db
        .update(schema.users)
        .set({
          Nombre: Nombre,
          Correo: Correo,
          Apellidos: Apellidos,
          Contrasenia: hashedPassword,
          EstaEliminado: 0,
        })
        .where(eq(schema.users.Correo, Correo));
      return c.json({ message: "User created" }, 201);
    } else if (existingUsers.length === 1 && !existingUsers[0].EstaEliminado) {
      return c.json({ message: "User already exists" }, 400);
    }

    const hashedPassword = await bcrypt.hash(Contrasenia, 10);
    const uuid = self.crypto.randomUUID();

    await db.insert(schema.users).values({
      id: uuid,
      Nombre,
      Correo,
      Apellidos,
      Contrasenia: hashedPassword,
      EstaEliminado: 0,
    });

    return c.json({ message: "User created" }, 201);
  });
  public getUsers = factory.createHandlers(async (c) => {
    const users = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.EstaEliminado, 0));
    if (users.length === 0) {
      return c.json({ message: "No users found" }, 404);
    }
    return c.json(users);
  });
  public getPagedUsers = factory.createHandlers(async (c) => {
    const { page, limit } = c.req.query();
    page ? page : 0;
    limit ? limit : 25;

    const intPage = parseInt(page);
    const intLimit = parseInt(limit);

    const users = await db
      .select()
      .from(schema.users)
      .orderBy(asc(schema.users.EstaEliminado))
      .where(eq(schema.users.EstaEliminado, 0))
      .limit(intLimit)
      .offset(intPage * intLimit);

    return c.json(users);
  });
  public updateUser = factory.createHandlers(async (c) => {
    const body = await c.req.json();
    const user = await db
      .select()
      .from(schema.users)
      .where(
        and(eq(schema.users.id, body.id), eq(schema.users.EstaEliminado, 0))
      );
    if (user.length === 0) {
      return c.json({ message: "User not found" }, 404);
    }
    const update = await db
      .update(schema.users)
      .set(body)
      .where(eq(schema.users.id, body.id))
      .returning();
    if (update.length === 0) {
      //nunca deberia entrar a este if
      return c.json({ message: "User not updated" }, 500);
    }
    return c.json({ message: "User updated" });
  });
  public deleteUser = factory.createHandlers(async (c) => {
    const { id } = await c.req.json();
    const user = await db
      .select()
      .from(schema.users)
      .where(and(eq(schema.users.id, id), eq(schema.users.EstaEliminado, 0)));
    if (user.length === 0) {
      return c.json({ message: "User not found" }, 404);
    }
    await db
      .update(schema.users)
      .set({ EstaEliminado: 1 })
      .where(eq(schema.users.id, id));
    return c.json({ message: "User deleted" }, 204);
  });
}

export default userController;
