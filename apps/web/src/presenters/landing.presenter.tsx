import { LandingPageView } from "@/views/landing.view";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useSuggestedLocations } from "@/models/landing.model";

export const LandingPagePresenter = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [debounced, setDebounced] = useState(searchLocation);
  const [numChars, setNumChars] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setNumChars(searchLocation.length);
    const handler = setTimeout(() => setDebounced(searchLocation), 400);
    return () => clearTimeout(handler);
  }, [searchLocation]);

  const { data: suggestions = [], isFetching } = useSuggestedLocations(
    debounced,
    debounced.length >= 3
  );

  const handleSelect = (locationName: string, lat: string, lon: string) => {
    navigate({
      to: "/location/$locationName",
      params: { locationName },
      search: { lat, lon },
    });
  };

  return (
    <LandingPageView
      handleInputChange={(e) => setSearchLocation(e.target.value)}
      handleSelect={handleSelect}
      suggestions={suggestions}
      numChars={numChars}
      isLoading={isFetching}
    />
  );
};
