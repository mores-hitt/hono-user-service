import { db } from "./db";
import * as schema from "../user";
import * as bcrypt from "bcryptjs";

(async () => {
  console.log("Seeding database...");
  for (let i = 0; i < 60; i++) {
    const uuid = self.crypto.randomUUID();
    const password = await bcrypt.hash(`Contrasenia${i}`, 10);
    await db.insert(schema.users).values({
      id: uuid,
      Nombre: `Nombre${i}`,
      Correo: `correo${i}@gmail.com`,
      Apellidos: `PrimerApellido${i} SegundoApellido${i}`,
      Contrasenia: password,
      EstaEliminado: 0,
    });
  }
  console.log("Database seeded.");
})();
