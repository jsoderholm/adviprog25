import { serveStatic } from "@hono/node-server/serve-static";
import configureOpenAPI from "@/lib/configure-open-api";
import createApp, { createRouter } from "@/lib/create-app";

const app = createApp();

configureOpenAPI(app);

const apiRoutes = app.basePath("/api").route(
  "/",
  createRouter().get("/", (c) => c.json({ message: "adviprog25" })),
);

app.get("*", serveStatic({ root: "../web/dist" }));
app.get("*", serveStatic({ path: "index.html", root: "../web/dist" }));

export type ApiRoutes = typeof apiRoutes;

export default app;
