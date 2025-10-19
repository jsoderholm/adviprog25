import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCardBackgroundStyles } from "@/lib/utils";
import type { FavoriteData } from "@/models/favorites.model";

type FavoriteCardProps = {
  title: string;
  handleFavoriteToggle: () => void;
};

const FavoriteCard = ({ title, handleFavoriteToggle }: FavoriteCardProps) => (
  <Card className={getCardBackgroundStyles()}>
    <CardHeader>
      <CardTitle className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </CardTitle>
      <CardDescription>{title}</CardDescription>
    </CardHeader>
    <CardContent className="flex justify-end mt-auto">
      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer"
        onClick={handleFavoriteToggle}
      >
        Favorite
        <Heart fill="true" />
      </Button>
    </CardContent>
  </Card>
);

type FavoritesViewProps = {
  favorites: FavoriteData[];
  isLoading: boolean;
  isError: boolean;
  handleFavoriteToggle: (id: number, name: string) => void;
};

export const FavoritesView = (props: FavoritesViewProps) => {
  if (props.isLoading) return <Skeleton className="size-full" />;
  if (props.isError) return <div>Error loading favorites</div>;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-semibold">Favorites</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {props.favorites.map(({ id, displayName }) => (
          <FavoriteCard
            key={id}
            title={displayName}
            handleFavoriteToggle={() =>
              props.handleFavoriteToggle(id, displayName)
            }
          />
        ))}
      </div>
    </div>
  );
};
