import { ArrowRight } from "lucide-react";
import { LocationSearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LocationHistoryStore } from "@/hooks/use-recent";
import { getCardBackgroundStyles } from "@/lib/utils";
import type { LocationsData } from "@/models/landing.model";

type LandingPageViewProps = {
  suggestions: LocationsData;
  handleInputChange: (query: string) => void;
  handleSelect: (location: LocationsData[number]) => void;
  handleNavigate: (location: LocationsData[number]) => void;
  isFetching: boolean;
} & Pick<LocationHistoryStore, "history">;

export const LandingPageView = ({
  suggestions,
  history,
  handleSelect,
  handleNavigate,
  handleInputChange,
  isFetching,
}: LandingPageViewProps) => (
  <div className="flex flex-col gap-4">
    <LocationSearchInput
      suggestions={suggestions}
      handleInputChange={handleInputChange}
      handleSelect={handleSelect}
      isFetching={isFetching}
    />
    <p className="text-2xl font-semibold">Recent locations</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {history.map((location) => (
        <LocationHistoryCard
          key={location.place_id}
          location={location}
          handleNavigate={handleNavigate}
        />
      ))}
    </div>
  </div>
);

type LocationHistoryCardProps = {
  location: LocationsData[number];
  handleNavigate: (location: LocationsData[number]) => void;
};

export const LocationHistoryCard = ({
  location,
  handleNavigate,
}: LocationHistoryCardProps) => (
  <Card className={getCardBackgroundStyles()}>
    <CardHeader>
      <CardTitle className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {location.display_name}
      </CardTitle>
      <CardDescription>{location.display_name}</CardDescription>
    </CardHeader>
    <CardContent className="flex justify-end">
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer"
        onClick={() => handleNavigate(location)}
      >
        View
        <ArrowRight />
      </Button>
    </CardContent>
  </Card>
);
