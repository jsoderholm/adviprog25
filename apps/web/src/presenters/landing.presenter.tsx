import { useLoaderDeps, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRecentLocationStore } from "@/hooks/use-recent";
import {
  type LocationsData,
  useSuggestedLocations,
} from "@/models/landing.model";
import { LandingPageView } from "@/views/landing.view";

const MIN_QUERY_LENGTH = 3 as const;

export const LandingPagePresenter = () => {
  const navigate = useNavigate({ from: "/" });
  const { append, history } = useRecentLocationStore();
  const { query } = useLoaderDeps({ from: "/_authenticated/" });

  const { data: suggestions = [], isFetching } = useSuggestedLocations({
    query: query ?? "",
    enabled: query !== undefined && query.length > MIN_QUERY_LENGTH,
  });

  const handleInputChange = useCallback(
    (query: string) =>
      navigate({
        search: { query },
        replace: true,
      }),
    [navigate],
  );

  const debouncedHandleInputChange = useDebouncedCallback(
    handleInputChange,
    1000,
  );

  const handleNavigate = useCallback(
    (location: LocationsData[number]) =>
      navigate({
        to: "/location/$locationName",
        params: { locationName: location.display_name },
        search: {
          placeId: location.place_id,
          lat: location.lat,
          lon: location.lon,
        },
      }),
    [navigate],
  );

  const handleSelect = useCallback(
    (location: LocationsData[number]) => {
      handleNavigate(location);
      append(location);
    },
    [append, handleNavigate],
  );

  return (
    <LandingPageView
      isFetching={isFetching}
      history={history}
      handleNavigate={handleNavigate}
      handleSelect={handleSelect}
      handleInputChange={debouncedHandleInputChange}
      suggestions={suggestions}
    />
  );
};
