import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  removeFavoriteMutationOptions,
  useFavorites,
} from "@/models/favorites.model";
import { FavoritesView } from "@/views/favorites.view";
import { useNavigate } from "@tanstack/react-router";
import type { Location } from "@/components/location-card";

export const FavoritesPresenter = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/" });
  const { data, isLoading, isError } = useFavorites();
  const { mutate } = useMutation(removeFavoriteMutationOptions(queryClient));

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

  const handleRemoveFavorite = useCallback(
    (id: number) => mutate(id),
    [mutate]
  );

  return (
    <FavoritesView
      favorites={data ?? []}
      isLoading={isLoading}
      isError={isError}
      handleNavigate={handleNavigate}
      handleFavoriteToggle={handleRemoveFavorite}
    />
  );
};
