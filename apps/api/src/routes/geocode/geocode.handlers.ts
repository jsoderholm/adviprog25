import type { GetRoute } from "./geocode.route";
import type { AppRouteHandler } from "src/lib/create-app";
import { geocodeService } from "src/dependencies";
import * as HttpStatusCodes from "stoker/http-status-codes";

export const get: AppRouteHandler<GetRoute> = async (c) => {
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
};
