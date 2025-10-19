import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import type { Location, LocationHistoryStore } from "@/hooks/use-recent";
import { cn, getCardBackgroundStyles } from "@/lib/utils";
import type { LocationsData } from "@/models/landing.model";

type LandingPageViewProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (location: Location) => void;
  suggestions: LocationsData | [];
  numChars: number;
  isLoading: boolean;
} & Pick<LocationHistoryStore, "history"> & {
    handleNavigate: (location: Location) => void;
  };

export const LandingPageView = ({
  handleInputChange,
  handleSelect,
  suggestions,
  numChars,
  isLoading,
  history,
  handleNavigate,
}: LandingPageViewProps) => {
  return (
    <div className="flex flex-col gap-4">
      <SearchInput
        handleInputChange={handleInputChange}
        numChars={numChars}
        isLoading={isLoading}
        suggestions={suggestions as LocationsData}
        handleSelect={(name, place_id, lat, lon) =>
          handleSelect({ name, place_id, lat, lon })
        }
      />
      <div className="grid grid-cols-4 gap-4">
        {history.map((location) => (
          <LocationHistoryCard
            key={location.name}
            location={location}
            handleNavigate={handleNavigate}
          />
        ))}
      </div>
    </div>
  );
};

type LocationHistoryCardProps = {
  location: Location;
  handleNavigate: (location: Location) => void;
};

const LocationHistoryCard = ({
  location,
  handleNavigate,
}: LocationHistoryCardProps) => {
  return (
    <Card className={cn("", getCardBackgroundStyles())}>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            {location.name}
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

type SearchInputProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  numChars: number;
  isLoading: boolean;
  suggestions: LocationsData;
  handleSelect: (
    name: string,
    place_id: number,
    lat: string,
    lon: string
  ) => void;
};

const SearchInput = ({
  handleInputChange,
  numChars,
  isLoading,
  suggestions,
  handleSelect,
}: SearchInputProps) => {
  return (
    <div className="relative w-1/3">
      <Input
        placeholder="Search..."
        onChange={handleInputChange}
        className="placeholder:text-primary placeholder:text-[1.1rem]"
      />
      {/* {numChars > 0 && numChars < 3 && (
        <div className="absolute z-10 w-full">
          <p className="p-2">Enter at least 3 characters...</p>
        </div>
      )} */}
      {numChars > 0 && numChars < 3 && (
        <Command className="border">
          <CommandList>
            <CommandItem disabled>Enter at least 3 characters...</CommandItem>
          </CommandList>
        </Command>
      )}
      {numChars > 2 && (
        <Command className="border">
          <CommandList>
            {isLoading && <CommandItem disabled>Searching...</CommandItem>}
            {!isLoading && suggestions.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            {!isLoading && suggestions.length > 0 && (
              <CommandGroup>
                {suggestions.map(
                  ({ display_name: name, lat, lon, place_id }) => (
                    <CommandItem
                      key={place_id}
                      onSelect={() => handleSelect?.(name, place_id, lat, lon)}
                      className="cursor-pointer"
                    >
                      {name}
                    </CommandItem>
                  )
                )}
                <CommandEmpty>No results found.</CommandEmpty>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      )}
    </div>
  );
};
