import { createFileRoute } from "@tanstack/react-router";
import { SearchresultsView } from "./-searchresultsView";

export const Route = createFileRoute("/_authenticated/searchresults")({
  component: RouteComponent,
});

function RouteComponent() {
  const { model } = Route.useRouteContext();
  return <SearchresultsView />;
}
