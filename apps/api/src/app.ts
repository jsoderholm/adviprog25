import { serveStatic } from "@hono/node-server/serve-static";
import configureOpenAPI from "./lib/configure-open-api";
import createApp from "./lib/create-app";
import auth from "./routes/auth";
import geocode from "./routes/geocode/geocode.route";
import index from "./routes/index.route";
import weather from "./routes/weather/weather.route";
import account from "./routes/account/account.route";

const app = createApp();

const apiRoutes = app
  .basePath("/api")
  .route("/", index)
  .route("/", auth)
  .route("/weather", weather)
  .route("/geocode", geocode)
  .route("/account", account);

configureOpenAPI(apiRoutes);

app.get("*", serveStatic({ root: "../web/dist" }));
app.get("*", serveStatic({ path: "index.html", root: "../web/dist" }));

export type AppType = typeof apiRoutes;

export default app;
