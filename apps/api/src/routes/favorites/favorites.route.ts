import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import {
  CreateFavoriteSchema,
  DeleteFavoriteSchema,
  GetAllResponseSchema,
  GetParamsSchema,
} from "./favorites.schemas";

export const getAll = createRoute({
  tags: ["Favorites"],
  method: "get",
  path: "/",
  request: {
    query: GetParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      GetAllResponseSchema,
      "Favorites for the given user"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema(
        "Could not retrieve favorites for the given user"
      ),
      "Failure to retrieve favorites data"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createMessageObjectSchema("Invalid request parameters"),
      "The request parameters were invalid"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("User not found"),
      "User not found"
    ),
  },
});

export const create = createRoute({
  tags: ["Favorites"],
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(
      CreateFavoriteSchema,
      "Favorite location to create"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      CreateFavoriteSchema,
      "Favorite location created"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema("Could not create favorite location"),
      "Failure to create favorite location"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createMessageObjectSchema("Invalid request body"),
      "The request body was invalid"
    ),
  },
});

export const deleteOne = createRoute({
  tags: ["Favorites"],
  method: "delete",
  path: "/",
  request: {
    body: jsonContentRequired(
      DeleteFavoriteSchema,
      "Favorite location to delete"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Favorite location deleted"),
      "Favorite location deleted"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema("Could not delete favorite location"),
      "Failure to delete favorite location"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createMessageObjectSchema("Invalid request body"),
      "The request body was invalid"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Favorite location not found"),
      "Favorite location not found"
    ),
  },
});

export type GetAllRoute = typeof getAll;
export type CreateRoute = typeof create;
export type DeleteRoute = typeof deleteOne;
