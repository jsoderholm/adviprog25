import { useSuspenseQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useFavoritesMutation, useIsFavorite } from "@/models/favorites.model";
import { weatherQueryOptions } from "@/models/location.model";
import { LocationView } from "@/views/location.view";

type LocationPresenterProps = {
  locationName: string;
  placeId: number;
  lat: string;
  lon: string;
};

export const LocationPresenter = ({
  locationName,
  placeId,
  lat,
  lon,
}: LocationPresenterProps) => {
  const { data } = useSuspenseQuery(weatherQueryOptions(lat, lon));
  const isFavorited = useIsFavorite(placeId);
  const { removeMutation, addMutation } = useFavoritesMutation();

  const handleFavoriteToggle = useCallback(() => {
    if (isFavorited) removeMutation.mutate(isFavorited.id);
    else addMutation.mutate({ placeId, locationName, lat, lon });
  }, [
    isFavorited,
    removeMutation,
    addMutation,
    placeId,
    locationName,
    lat,
    lon,
  ]);

  return (
    <LocationView
      locationName={locationName}
      locationData={data}
      isFavorite={!!isFavorited}
      onFavoriteToggle={handleFavoriteToggle}
    />
  );
};
