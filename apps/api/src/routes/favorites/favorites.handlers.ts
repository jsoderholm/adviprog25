import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { db } from "../../db";
import { favorites as favoritesTable, user } from "../../db/schema";
import type { AppRouteHandler } from "../../lib/create-app";
import type { CreateRoute, DeleteRoute, GetAllRoute } from "./favorites.route";

export const getAll: AppRouteHandler<GetAllRoute> = async (c) => {
  const params = c.req.valid("query");
  const userId = params.user;
  try {
    const validUser = await db.select().from(user).where(eq(user.id, userId));
    if (validUser.length === 0) {
      return c.json({ message: "User not found" }, HttpStatusCodes.NOT_FOUND);
    }
    const favorites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, userId));
    return c.json(favorites, HttpStatusCodes.OK);
  } catch (_) {
    return c.json(
      { message: "Could not retrieve favorites for the given user" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const body = c.req.valid("json");
  try {
    const newFavorite = await db
      .insert(favoritesTable)
      .values({
        placeId: body.placeId,
        displayName: body.displayName,
        userId: body.userId,
      })
      .returning()
      .onConflictDoNothing();
    return c.json(newFavorite[0], HttpStatusCodes.CREATED);
  } catch (_) {
    return c.json(
      { message: "Could not create favorite location" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

export const deleteOne: AppRouteHandler<DeleteRoute> = async (c) => {
  const body = c.req.valid("json");
  try {
    const deleted = await db
      .delete(favoritesTable)
      .where(eq(favoritesTable.id, body.id))
      .returning();
    if (deleted.length === 0) {
      return c.json(
        { message: "Favorite location not found" },
        HttpStatusCodes.NOT_FOUND,
      );
    }
    return c.json({ message: "Favorite location deleted" }, HttpStatusCodes.OK);
  } catch (_) {
    return c.json(
      { message: "Could not delete favorite location" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};
