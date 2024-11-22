if (!Bun.env.SECRET) {
  throw new Error("SECRET is required");
}
const env = {
  SECRET: Bun.env.SECRET,
  PORT: Bun.env.PORT,
};

export default env;
