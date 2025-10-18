import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { geocodeService } from "../../dependencies";
import { createRouter } from "../../lib/create-app";
import { ParamsSchema, GeocodeResponseSchema } from "./geocode.schemas";

const router = createRouter().openapi(
  createRoute({
    tags: ["Geocode"],
    method: "get",
    path: "/",
    request: {
      query: ParamsSchema,
    },
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        GeocodeResponseSchema,
        "Geocode data for the given location"
      ),
      [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
        createMessageObjectSchema(
          "Could not retrieve geocode data for the given location"
        ),
        "Failure to retrieve geocode data"
      ),
    },
  }),
  async (c) => {
    const params = c.req.valid("query");
    const data = await geocodeService.coordinatesFromText(params.search);
    if (!data) {
      return c.json(
        {
          message: "Could not retrieve geocode data for the given location",
        },
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    return c.json(data, HttpStatusCodes.OK);
  }
);

export default router;
