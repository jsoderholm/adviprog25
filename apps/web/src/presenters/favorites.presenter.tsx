import { FavoritesView } from "@/views/favorites.view";
import { useFavorites } from "@/models/favorites.model";

export const FavoritesPresenter = () => {
  const { data, isLoading, isError } = useFavorites();
  return (
    <FavoritesView favorites={data} isLoading={isLoading} isError={isError} />
  );
};
