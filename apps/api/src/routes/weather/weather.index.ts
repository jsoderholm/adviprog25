import { createRouter } from "src/lib/create-app";

import * as routes from "./weather.route";
import * as handlers from "./weather.handlers";

const router = createRouter().openapi(routes.get, handlers.get);

export default router;
