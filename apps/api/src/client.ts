import { createAuthClient } from "better-auth/client";
import { hc } from "hono/client";
import type { AppType } from "@/app";
import env from "@/env";

const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL,
});

const { api } = hc<AppType>("/");

export { authClient, api };
