import { Scalar } from "@scalar/hono-api-reference";
import type { AppOpenAPI } from "./types";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "0.0.0",
      title: "adviprog25 API",
    },
  });

  app.get(
    "/reference",
    Scalar({
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        clientKey: "fetch",
        targetKey: "js",
      },
      url: "/doc",
    }),
  );
}
