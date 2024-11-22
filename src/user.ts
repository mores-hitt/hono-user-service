import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  Nombre: text("nombre").notNull(),
  Correo: text("correo").notNull().unique(),
  Apellidos: text("apellidos").notNull(),
  Contrasenia: text("contrasenia").notNull(),
  EstaEliminado: integer("esta_eliminado").default(0).notNull(),
});
