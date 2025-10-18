import { createLazyFileRoute } from "@tanstack/react-router";
import { LocationPresenter } from "@/presenters/location.presenter";

export const Route = createLazyFileRoute(
  "/_authenticated/location/$locationName",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { locationName } = Route.useParams();
  const { lat, lon } = Route.useSearch();
  return <LocationPresenter locationName={locationName} lat={lat} lon={lon} />;
}
