import type { GetRoute } from "./geocode.route";
import type { AppRouteHandler } from "../../lib/create-app";
import { geocodeService } from "../../dependencies";
import * as HttpStatusCodes from "stoker/http-status-codes";

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const params = c.req.valid("query");
  try {
    const data = await geocodeService.coordinatesFromText(params.search);
    return c.json(data, HttpStatusCodes.OK);
  } catch (error) {
    return c.json(
      {
        message: "Could not retrieve geocode data for the given location",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
