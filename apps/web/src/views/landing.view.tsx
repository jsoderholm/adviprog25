import { LocationSearchInput } from "@/components/search-input";
import type { LocationHistoryStore } from "@/hooks/use-recent";
import type { LocationsData } from "@/models/landing.model";
import { LocationCard } from "@/components/location-card";
import type { Location } from "@/components/location-card";

type LandingPageViewProps = {
  queryLength: number;
  isDebouncing: boolean;
  suggestions: LocationsData;
  handleInputChange: (query: string) => void;
  handleSelect: (location: LocationsData[number]) => void;
  handleNavigate: (location: Location) => void;
  isFetching: boolean;
} & Pick<LocationHistoryStore, "history">;

export const LandingPageView = ({
  queryLength,
  isDebouncing,
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
      queryLength={queryLength}
      isDebouncing={isDebouncing}
    />
    <p className="text-2xl font-semibold">Recent locations</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {history.map((location) => (
        <LocationCard
          key={location.place_id}
          location={location}
          handleNavigate={handleNavigate}
        />
      ))}
    </div>
  </div>
);
