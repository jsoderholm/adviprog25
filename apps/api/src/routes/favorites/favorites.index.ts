import { createRouter } from "../../lib/create-app";
import * as handlers from "./favorites.handlers";
import * as routes from "./favorites.route";

const router = createRouter()
  .openapi(routes.getAll, handlers.getAll)
  .openapi(routes.create, handlers.create)
  .openapi(routes.deleteOne, handlers.deleteOne);

export default router;
