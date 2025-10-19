import { createRoute } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import db from "../../db";
import { user } from "../../db/schema";
import { createRouter } from "../../lib/create-app";
import { auth } from "../../lib/auth";

const router = createRouter().openapi(
  createRoute({
    tags: ["Account"],
    method: "delete",
    path: "/",
    responses: {
      [HttpStatusCodes.NO_CONTENT]: {
        description: "Account deleted successfully",
      },
      [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
        createMessageObjectSchema("You must be signed in to delete your account."),
        "User is not authenticated",
      ),
      [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
        createMessageObjectSchema(
          "We couldn’t delete the account. Please try again later.",
        ),
        "Unexpected failure",
      ),
    },
  }),
  async (c) => {
    const currentUser = c.get("user");
    const currentSession = c.get("session");

    if (!currentUser || !currentSession) {
      return c.json(
        { message: "You must be signed in to delete your account." },
        HttpStatusCodes.UNAUTHORIZED,
      );
    }

    try {
      await db.transaction(async (tx) => {
        await tx.delete(user).where(eq(user.id, currentUser.id));
      });

      const signOutResponse = await auth.api.signOut({
        headers: c.req.raw.headers,
        asResponse: true,
      });

      signOutResponse.headers.forEach((value, key) => {
        c.header(key, value, {
          append: key.toLowerCase() === "set-cookie",
        });
      });

      return c.newResponse(null, HttpStatusCodes.NO_CONTENT);
    } catch (error) {
      c.get("logger").error(
        error,
        "Failed to delete account for user %s",
        currentUser.id,
      );

      return c.json(
        {
          message: "We couldn’t delete the account. Please try again later.",
        },
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },
);

export default router;
