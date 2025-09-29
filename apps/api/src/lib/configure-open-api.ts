import { Scalar } from "@scalar/hono-api-reference";
import packageJSON from "../../package.json" with { type: "json" };
import env from "../env";
import type { AppOpenAPI } from "./create-app";

export default function configureOpenAPI(app: AppOpenAPI) {
  if (env.NODE_ENV === "production") return;

  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "API",
    },
  });

  app.get(
    "/reference",
    Scalar({
      pageTitle: "API Reference",
      url: "/doc",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
      sources: [
        {
          url: "/api/doc",
          title: "API",
        },
        {
          url: "/api/auth/open-api/generate-schema",
          title: "Auth",
        },
      ],
    }),
  );
}
