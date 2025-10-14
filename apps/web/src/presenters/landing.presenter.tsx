import { LandingPageView } from "@/views/landing.view";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const LandingPagePresenter = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLocation(e.target.value);
  };

  const handleSearch = () => {
    navigate({
      to: "/location/$locationName",
      params: { locationName: searchLocation },
    });
  };

  return (
    <LandingPageView
      isDisabled={!searchLocation}
      handleInputChange={handleInputChange}
      handleSearch={handleSearch}
    />
  );
};
