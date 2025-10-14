import { LocationPresenter } from "@/presenters/location.presenter";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/location/$locationName")({
  component: RouteComponent,
});

function RouteComponent() {
  const { locationName } = Route.useParams();
  return <LocationPresenter locationName={locationName} />;
}
