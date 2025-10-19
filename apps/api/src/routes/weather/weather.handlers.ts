import type { GetRoute } from "./weather.route";
import type { AppRouteHandler } from "../../lib/create-app";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { weatherService } from "../../dependencies";

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const params = c.req.valid("query");
  const lat = parseFloat(params.lat);
  const lon = parseFloat(params.lon);
  if (Number.isNaN(lat) || Number.isNaN(lon)) {
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
};
