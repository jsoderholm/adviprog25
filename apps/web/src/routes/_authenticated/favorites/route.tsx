import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/_authenticated/favorites")({
  component: RouteComponent,
});

const locations = [
  "Berlin",
  "London",
  "Paris",
  "Madrid",
  "Rome",
  "Barcelona",
  "Lisbon",
  "Vienna",
  "Brussels",
  "Amsterdam",
  "Stockholm",
];

function RouteComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {locations.map((location) => (
        <FavoriteCard key={location} location={location} />
      ))}
    </div>
  );
}

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
