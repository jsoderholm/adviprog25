import { createFileRoute } from "@tanstack/react-router";
import { LocationPresenter } from "@/presenters/location.presenter";

type LocationSearch = {
  lat: string;
  lon: string;
};

export const Route = createFileRoute("/_authenticated/location/$locationName")({
  validateSearch: (search: Record<string, unknown>): LocationSearch => {
    return {
      lat: (search.lat as string) || "",
      lon: (search.lon as string) || "",
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { locationName } = Route.useParams();
  const { lat, lon } = Route.useSearch();
  return <LocationPresenter locationName={locationName} lat={lat} lon={lon} />;
}
