import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { FavoriteData } from "@/models/favorites.model";
import { LocationCard } from "@/components/location-card";
import type { Location } from "@/components/location-card";

type FavoriteButtonProps = {
  handleFavoriteToggle: () => void;
};

const FavoriteButton = ({ handleFavoriteToggle }: FavoriteButtonProps) => (
  <Button
    size="sm"
    variant="outline"
    className="cursor-pointer"
    onClick={(e) => {
      e.stopPropagation();
      handleFavoriteToggle();
    }}
  >
    Favorite
    <Heart className="fill-black dark:fill-white" />
  </Button>
);

type FavoritesViewProps = {
  favorites: FavoriteData[];
  isLoading: boolean;
  isError: boolean;
  handleNavigate: (location: Location) => void;
  handleFavoriteToggle: (id: number, name: string) => void;
};

export const FavoritesView = (props: FavoritesViewProps) => {
  if (props.isLoading) return <Skeleton className="size-full" />;
  if (props.isError) return <div>Error loading favorites</div>;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-semibold">Favorites</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {props.favorites.length === 0 && <p>No favorites added yet.</p>}
        {props.favorites.map((favorite) => (
          <LocationCard
            key={favorite.id}
            location={{
              place_id: favorite.placeId,
              display_name: favorite.displayName,
              lat: favorite.lat,
              lon: favorite.lon,
            }}
            handleNavigate={props.handleNavigate}
          >
            <FavoriteButton
              handleFavoriteToggle={() =>
                props.handleFavoriteToggle(favorite.id, favorite.displayName)
              }
            />
          </LocationCard>
        ))}
      </div>
    </div>
  );
};
