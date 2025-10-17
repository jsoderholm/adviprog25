import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useWeather } from "@/models/location.model";
import { LocationView } from "@/views/location.view";

type LocationPresenterProps = {
  locationName: string;
};

export const LocationPresenter = ({ locationName }: LocationPresenterProps) => {
  const { data, error, isLoading } = useWeather(locationName);
  const [searchLocation, setSearchLocation] = useState("");
  const [homeSelected, setHomeSelected] = useState(false);
  const [favoriteSelected, setFavoriteSelected] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLocation(e.target.value);
  };

  const handleFavoriteChange = () => {
    setFavoriteSelected(!favoriteSelected);
  };

  const handleHomeChange = () => {
    setHomeSelected(!homeSelected);
  };

  const handleSearch = () => {
    navigate({
      to: "/location/$locationName",
      params: { locationName: searchLocation },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <LocationView
      locationName={locationName}
      locationData={data!}
      isDisabled={!searchLocation}
      handleInputChange={handleInputChange}
      handleSearch={handleSearch}
      homeSelected={homeSelected}
      favoriteSelected={favoriteSelected}
      handleFavoriteChange={handleFavoriteChange}
      handleHomeChange={handleHomeChange}
    />
  );
};
