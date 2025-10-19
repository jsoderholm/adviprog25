import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  removeFavoriteMutationOptions,
  useFavorites,
} from "@/models/favorites.model";
import { FavoritesView } from "@/views/favorites.view";

export const FavoritesPresenter = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useFavorites();
  const { mutate } = useMutation(removeFavoriteMutationOptions(queryClient));

  const handleRemoveFavorite = useCallback(
    (id: number) => mutate(id),
    [mutate],
  );

  return (
    <FavoritesView
      favorites={data ?? []}
      isLoading={isLoading}
      isError={isError}
      handleFavoriteToggle={handleRemoveFavorite}
    />
  );
};
