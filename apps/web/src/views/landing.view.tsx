import { ArrowRight } from "lucide-react";
import { LocationSearchInput } from "@/components/search-input";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
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
}: LandingPageViewProps) => {
  return (
    <div className="flex flex-col gap-4">
      <LocationSearchInput
        suggestions={suggestions}
        handleInputChange={handleInputChange}
        handleSelect={handleSelect}
        isFetching={isFetching}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
};

type LocationHistoryCardProps = {
  location: LocationsData[number];
  handleNavigate: (location: LocationsData[number]) => void;
};

const LocationHistoryCard = ({
  location,
  handleNavigate,
}: LocationHistoryCardProps) => {
  return (
    <Card className={getCardBackgroundStyles()}>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            {location.display_name}
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
              onClick={() => handleNavigate(location)}
            >
              View
              <ArrowRight />
            </Badge>
          </CardAction>
        </div>
      </CardContent>
    </Card>
  );
};
