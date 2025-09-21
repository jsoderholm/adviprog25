import {
  OpenAPIHono,
  type RouteConfig,
  type RouteHandler,
} from "@hono/zod-openapi";
import { requestId } from "hono/request-id";
import type { PinoLogger } from "hono-pino";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import type { auth } from "@/lib/auth";
import { authMiddleware } from "@/middlewares/auth";
import { pinoLogger } from "@/middlewares/pino-logger";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app
    .use(requestId())
    .use(serveEmojiFavicon("☁️"))
    .use(pinoLogger())
    .use(authMiddleware);
  app.notFound(notFound);
  app.onError(onError);
  return app;
}
