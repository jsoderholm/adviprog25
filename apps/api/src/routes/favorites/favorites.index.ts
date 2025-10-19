import { createRouter } from "../../lib/create-app";

import * as routes from "./favorites.route";
import * as handlers from "./favorites.handlers";

const router = createRouter()
  .openapi(routes.getAll, handlers.getAll)
  .openapi(routes.create, handlers.create)
  .openapi(routes.deleteOne, handlers.deleteOne);

export default router;
