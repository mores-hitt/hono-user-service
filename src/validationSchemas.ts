import { z } from "zod";

const createUserSchema = z
  .object({
    Nombre: z
      .string()
      .min(1)
      .max(15)
      .refine((val) => !/\d/.test(val), "Name must not contain numbers"),
    Correo: z.string().min(1).max(100).email(),
    Apellidos: z
      .string()
      .min(1)
      .max(100)
      .refine((val) => !/\d/.test(val), "Name must not contain numbers")
      .refine(
        (val) => !/^\s|\s{2,}|\s$/.test(val),
        "Name cannot have leading/trailing spaces or consecutive spaces"
      )
      .refine((val) => /\s/.test(val), "Name must contain a space"),
    Contrasenia: z.string().min(1).max(30),
  })
  .strict();

const getPagedUsersSchema = z
  .object({
    page: z.coerce.number().nonnegative().optional(),
    limit: z.coerce.number().nonnegative().optional(),
  })
  .strict();

const updateUserSchema = z
  .object({
    id: z.string().uuid().optional(),
    Nombre: z
      .string()
      .min(1)
      .max(15)
      .refine((val) => !/\d/.test(val), "Name must not contain numbers")
      .optional(),
    Correo: z.string().min(1).max(100).email().optional(),
    Apellidos: z
      .string()
      .min(1)
      .max(100)
      .refine((val) => !/\d/.test(val), "Name must not contain numbers")
      .refine(
        (val) => !/^\s|\s{2,}|\s$/.test(val),
        "Name cannot have leading/trailing spaces or consecutive spaces"
      )
      .refine((val) => /\s/.test(val), "Name must contain a space")
      .optional(),
    Contrasenia: z.string().min(1).max(30).optional(),
  })
  .strict();

const deleteUserSchema = z
  .object({
    id: z.string().uuid(),
  })
  .strict();

export {
  createUserSchema,
  getPagedUsersSchema,
  updateUserSchema,
  deleteUserSchema,
};
