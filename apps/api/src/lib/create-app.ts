import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import { pinoLogger } from "@/middlewares/pino-logger";
import type { AppBindings } from "./types";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);
  return app;
}
