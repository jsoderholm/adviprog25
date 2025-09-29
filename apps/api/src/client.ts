import { createAuthClient } from "better-auth/client";
import { hc } from "hono/client";
import type { AppType } from "./app";

const authClient = createAuthClient();

const { api } = hc<AppType>("/");

export { authClient, api };
