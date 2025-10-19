import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { ParamsSchema, WeatherResponseSchema } from "./weather.schemas";

export const get = createRoute({
  tags: ["Weather"],
  method: "get",
  path: "/",
  request: {
    query: ParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      WeatherResponseSchema,
      "Weather data for the given location",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createMessageObjectSchema(
        "Could not retrieve weather data for the given location",
      ),
      "Failure to process request",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema("Invalid latitude or longitude parameters"),
      "Failure to retrieve weather data",
    ),
  },
});

export type GetRoute = typeof get;
