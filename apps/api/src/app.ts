import { serveStatic } from "@hono/node-server/serve-static";
import configureOpenAPI from "./lib/configure-open-api";
import createApp from "./lib/create-app";
import auth from "./routes/auth";
import index from "./routes/index.route";

const app = createApp();

const apiRoutes = app.basePath("/api").route("/", index).route("/", auth);

configureOpenAPI(apiRoutes);

app.get("*", serveStatic({ root: "../web/dist" }));
app.get("*", serveStatic({ path: "index.html", root: "../web/dist" }));

export type AppType = typeof apiRoutes;

export default app;
