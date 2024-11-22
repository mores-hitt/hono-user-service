import { Hono } from "hono";
import { logger } from "hono/logger";
import type { JwtVariables } from "hono/jwt";
import { jwtMiddleware, exceptionMiddleware } from "./middlewares";
import env from "./env";
import users from "./routes";
import { testConnection } from "./database/db";

testConnection();

type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>().basePath("/api");

app.use(logger());

app.use(exceptionMiddleware);

app.use(jwtMiddleware);

app.route("/user", users);

export default {
  port: env.PORT,
  fetch: app.fetch,
};

/*
LOS TOKENS INSANOS
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzcyMjc4MTV9.YNvBYRISku72oDZI6cW0NhLqrt3pTn_FCMEcFtS2-28
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzcyMjc2OTV9.Cdu4YpUVCJYAsa5gZslIluBLpgDqg0JsyWwyP9RYmG4
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzcyMjc2OTV9.Cdu4YpUVCJYAsa5gZslIluBLpgDqg0JsyWwyP9RYmG4
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDI0MTIwODl9.u4TpUX47cXVn4uMjulgLszZcuSJoFqjgXXwGzvBWuug

sin user

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaG9sYSIsImV4cCI6MTczNzE2ODA2Mn0.O9UYw8dRECpvsudQ6V9UV4z0-DUDFM49vroAiKuSYQA
con user
*/
