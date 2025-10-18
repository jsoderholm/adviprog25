import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { weatherService } from "../../dependencies";
import { createRouter } from "../../lib/create-app";
import { ParamsSchema, WeatherResponseSchema } from "./weather.schemas";

const router = createRouter().openapi(
  createRoute({
    tags: ["Weather"],
    method: "get",
    path: "/",
    request: {
      query: ParamsSchema,
    },
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        WeatherResponseSchema,
        "Weather data for the given location"
      ),
      [HttpStatusCodes.BAD_REQUEST]: jsonContent(
        createMessageObjectSchema(
          "Could not retrieve weather data for the given location"
        ),
        "Failure to process request"
      ),
      [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
        createMessageObjectSchema("Invalid latitude or longitude parameters"),
        "Failure to retrieve weather data"
      ),
    },
  }),
  async (c) => {
    const params = c.req.valid("query");
    const lat = parseFloat(params.lat);
    const lon = parseFloat(params.lon);
    if (isNaN(lat) || isNaN(lon)) {
      return c.json(
        { message: "Invalid latitude or longitude parameters" },
        HttpStatusCodes.BAD_REQUEST
      );
    }
    const data = await weatherService.getWeatherFromCoordinates(lat, lon);
    if (!data) {
      return c.json(
        {
          message: "Could not retrieve weather data for the given location",
        },
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    return c.json(data, HttpStatusCodes.OK);
  }
);

export default router;
