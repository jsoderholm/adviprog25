import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCardBackgroundStyles } from "@/lib/utils";
import type { FavoriteData } from "@/models/favorites.model";

type FavoriteCardProps = {
  location: string;
};

const FavoriteCard = ({ location }: FavoriteCardProps) => (
  <Card className={getCardBackgroundStyles()}>
    <CardHeader className="gap-0">
      <CardDescription>{location}</CardDescription>
      <CardTitle className="text-2xl font-semibold tabular-nums">
        {location}
      </CardTitle>
      <CardAction>
        <Button size="icon" variant="ghost" className="cursor-pointer">
          <Heart />
        </Button>
      </CardAction>
    </CardHeader>
  </Card>
);
type FavoritesViewProps = {
  favorites: FavoriteData[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

export const FavoritesView = (props: FavoritesViewProps) => {
  if (props.isLoading) return <div>Loading...</div>;
  if (props.isError) return <div>Error loading favorites</div>;

  return (
    <div>
      {props.favorites!.map((favorite) => (
        <FavoriteCard key={favorite.id} location={favorite.displayName} />
      ))}
    </div>
  );
};
