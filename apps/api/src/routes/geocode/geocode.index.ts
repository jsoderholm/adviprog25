import { createRouter } from "../../lib/create-app";
import * as handlers from "./geocode.handlers";
import * as routes from "./geocode.route";

const router = createRouter().openapi(routes.get, handlers.get);

export default router;
