import { createRouter } from "../../lib/create-app";

import * as routes from "./geocode.route";
import * as handlers from "./geocode.handlers";

const router = createRouter().openapi(routes.get, handlers.get);

export default router;
