import { FavoritesView } from "@/views/favorites.view";
import { useFavorites, useRemoveFavorite } from "@/models/favorites.model";
import { toast } from "sonner";

export const FavoritesPresenter = () => {
  const { data, isLoading, isError } = useFavorites();
  const removeFavoriteMutation = useRemoveFavorite();

  const handleFavoriteToggle = (favoriteId: number, locationName: string) => {
    removeFavoriteMutation.mutate(favoriteId);
    toast.success(`${locationName} removed from favorites!`);
  };
  return (
    <FavoritesView
      favorites={data}
      isLoading={isLoading}
      isError={isError}
      handleFavoriteToggle={handleFavoriteToggle}
    />
  );
};
