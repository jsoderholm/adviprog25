import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import type { Location } from "@/hooks/use-recent";
import { useRecentLocationStore } from "@/hooks/use-recent";
import { useSuggestedLocations } from "@/models/landing.model";
import { LandingPageView } from "@/views/landing.view";

export const LandingPagePresenter = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [debounced, setDebounced] = useState(searchLocation);
  const [numChars, setNumChars] = useState(0);
  const navigate = useNavigate();

  const { append, history } = useRecentLocationStore();

  useEffect(() => {
    setNumChars(searchLocation.length);
    const handler = setTimeout(() => setDebounced(searchLocation), 400);
    return () => clearTimeout(handler);
  }, [searchLocation]);

  const { data: suggestions = [], isFetching } = useSuggestedLocations(
    debounced,
    debounced.length >= 3,
  );

  const handleNavigate = useCallback(
    (location: Location) =>
      navigate({
        to: "/location/$locationName",
        params: { locationName: location.name },
        search: { lat: location.lat, lon: location.lon },
      }),
    [navigate],
  );

  const handleSelect = useCallback(
    ({ name, lat, lon }: Location) => {
      append({ name, lat, lon });
      handleNavigate({ name, lat, lon });
    },
    [append, handleNavigate],
  );

  return (
    <LandingPageView
      handleInputChange={(e) => setSearchLocation(e.target.value)}
      handleSelect={handleSelect}
      suggestions={suggestions}
      numChars={numChars}
      isLoading={isFetching}
      history={history}
      handleNavigate={handleNavigate}
    />
  );
};
