import { Hono } from "hono";
import userController from "./controller";
import { zValidator } from "@hono/zod-validator";
import {
  createUserSchema,
  getPagedUsersSchema,
  updateUserSchema,
  deleteUserSchema,
} from "./validationSchemas";

const controller = new userController();

const app = new Hono()
  .post("/", zValidator("json", createUserSchema), ...controller.createUser)
  .get("/", ...controller.getUsers)
  .get(
    "/:page/:limit",
    zValidator("param", getPagedUsersSchema),
    ...controller.getPagedUsers
  )
  .patch("/", zValidator("json", updateUserSchema), ...controller.updateUser)
  .delete("/", zValidator("json", deleteUserSchema), ...controller.deleteUser);

export default app;
