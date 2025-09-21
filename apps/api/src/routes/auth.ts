import { auth } from "@/lib/auth";
import { createRouter } from "@/lib/create-app";

const router = createRouter().on(["POST", "GET"], "/auth/**", (c) =>
  auth.handler(c.req.raw),
);

export default router;
