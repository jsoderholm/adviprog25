import { useSuspenseQuery } from "@tanstack/react-query";
import { weatherQueryOptions } from "@/models/location.model";
import { LocationView } from "@/views/location.view";
import {
  useAddFavorite,
  useIsFavorite,
  useRemoveFavorite,
} from "@/models/favorites.model";
import { toast } from "sonner";
import { fa } from "zod/v4/locales";

type LocationPresenterProps = {
  locationName: string;
  placeId: string;
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
  const favorite = useIsFavorite(placeId);
  const addFavoriteMutation = useAddFavorite();
  const removeFavoriteMutation = useRemoveFavorite();

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFavoriteMutation.mutate(favorite.id);
      toast.success(`${locationName} removed from favorites!`);
    } else {
      addFavoriteMutation.mutate({ placeId, locationName, lat, lon });
      toast.success(`${locationName} added to favorites!`);
    }
  };

  return (
    <LocationView
      locationName={locationName}
      locationData={data}
      isFavorite={!!favorite}
      onFavoriteToggle={handleFavoriteToggle}
    />
  );
};
