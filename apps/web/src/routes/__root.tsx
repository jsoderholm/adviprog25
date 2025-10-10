import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { AppModel } from "@/model";

interface RouterContext {
  queryClient: QueryClient;
  model: AppModel;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      {/*<TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools buttonPosition="top-right" />
       */}
    </>
  ),
});
