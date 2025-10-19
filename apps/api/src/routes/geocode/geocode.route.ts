import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { GeocodeResponseSchema, ParamsSchema } from "./geocode.schemas";

export const get = createRoute({
  tags: ["Geocode"],
  method: "get",
  path: "/",
  request: {
    query: ParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      GeocodeResponseSchema,
      "Geocode data for the given location",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema(
        "Could not retrieve geocode data for the given location",
      ),
      "Failure to retrieve geocode data",
    ),
  },
});

export type GetRoute = typeof get;
