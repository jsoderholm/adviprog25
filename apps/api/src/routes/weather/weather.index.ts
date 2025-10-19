import { createRouter } from "../../lib/create-app";
import * as handlers from "./weather.handlers";
import * as routes from "./weather.route";

const router = createRouter().openapi(routes.get, handlers.get);

export default router;
