# syntax=docker/dockerfile:1
FROM oven/bun:alpine AS base
WORKDIR /app

FROM base AS install
RUN mkdir -p /temp/dev
COPY bun.lockb package.json /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY bun.lockb package.json /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS build-database
COPY src src
COPY drizzle drizzle
COPY bun.lockb package.json tsconfig.json ./
COPY --from=install /temp/dev/node_modules node_modules
RUN bun run migrate && bun run seed

FROM base AS release
COPY src src
COPY drizzle drizzle
COPY bun.lockb package.json tsconfig.json ./
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=build-database /app/sqlite.db .
CMD ["bun", "run", "./src/index.ts"]