import { createMiddleware } from "hono/factory";
import env from "./env";
import { jwt } from "hono/jwt";

const jwtMiddleware = createMiddleware(async (c, next) => {
  const jwtMiddleware = jwt({
    secret: env.SECRET,
  });
  return jwtMiddleware(c, next);
});

const exceptionMiddleware = createMiddleware(async (c, next) => {
  try {
    await next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 500);
    }
    return c.json({ message: "An unknown error has occured" }, 500);
  }
});

export {jwtMiddleware, exceptionMiddleware};
