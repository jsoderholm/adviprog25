import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRecentLocationStore } from "@/hooks/use-recent";
import {
  type LocationsData,
  useSuggestedLocations,
} from "@/models/landing.model";
import { LandingPageView } from "@/views/landing.view";
import type { Location } from "@/components/location-card";

const MIN_QUERY_LENGTH = 3 as const;

export const LandingPagePresenter = () => {
  const navigate = useNavigate({ from: "/" });
  const { append, history } = useRecentLocationStore();
  const [query, setQuery] = useState("");
  const [queryLength, setQueryLength] = useState(0);
  const [isDebouncing, setIsDebouncing] = useState(false);

  const { data: suggestions = [], isFetching } = useSuggestedLocations({
    query: query ?? "",
    enabled: query !== undefined && query.length >= MIN_QUERY_LENGTH,
  });

  const doneDebouncing = useCallback(
    (query: string) => {
      setIsDebouncing(false);
      setQuery(query);
    },

    [setQuery]
  );

  const debouncedHandleInputChange = useDebouncedCallback(doneDebouncing, 1000);

  const handleInputChange = useCallback(
    (query: string) => {
      setIsDebouncing(true);
      setQueryLength(query.length);
      debouncedHandleInputChange(query);
    },
    [debouncedHandleInputChange]
  );

  const handleNavigate = useCallback(
    (location: Location) =>
      navigate({
        to: "/location/$locationName",
        params: { locationName: location.display_name },
        search: {
          placeId: location.place_id,
          lat: location.lat,
          lon: location.lon,
        },
      }),
    [navigate]
  );

  const handleSelect = useCallback(
    (location: LocationsData[number]) => {
      handleNavigate(location);
      append(location);
    },
    [append, handleNavigate]
  );

  return (
    <LandingPageView
      queryLength={queryLength}
      isDebouncing={isDebouncing}
      isFetching={isFetching}
      history={history}
      handleNavigate={handleNavigate}
      handleSelect={handleSelect}
      handleInputChange={handleInputChange}
      suggestions={suggestions}
    />
  );
};
