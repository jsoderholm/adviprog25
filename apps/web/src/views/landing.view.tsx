import { RecentCard } from "@/components/recentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import type { LocationsData } from "@/models/landing.model";

type LandingPageViewProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (name: string, lat: string, lon: string) => void;
  suggestions: LocationsData | [];
  numChars: number;
  isLoading: boolean;
};

export const LandingPageView = ({
  handleInputChange,
  handleSelect,
  suggestions,
  numChars,
  isLoading,
}: LandingPageViewProps) => {
  const showDropdown = isLoading || suggestions.length > 0;

  return (
    <div className="w-full">
      <div className="grid grid-cols-20 grid-rows-4 gap-4 p-2 pb-4 pr-4 h-10/12">
        <div className="col-span-13 col-start-1 row-span-2 gap-4">
          <Card className="bg-gradient-to-r from-gray-600 to-background border h-full rounded-r-none">
            <CardHeader>
              <CardTitle className="text-2xl">
                Find your city and weather forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-[75%]">
                <Input
                  placeholder="Search..."
                  onChange={handleInputChange}
                  className="rounded-none placeholder:text-primary placeholder:text-[1.1rem]"
                />
                {numChars > 0 && numChars < 3 && (
                  <div className="absolute z-10 w-full">
                    <p className="p-2">Enter at least 3 characters...</p>
                  </div>
                )}
                {showDropdown && (
                  <Command>
                    <CommandList>
                      {isLoading && (
                        <CommandItem disabled>Searching...</CommandItem>
                      )}
                      {!isLoading && (
                        <CommandGroup>
                          {suggestions.map((suggestion, i) => (
                            <CommandItem
                              key={i}
                              onSelect={() =>
                                handleSelect(
                                  suggestion.display_name,
                                  suggestion.lat,
                                  suggestion.lon
                                )
                              }
                              className="cursor-pointer"
                            >
                              {suggestion.display_name}
                            </CommandItem>
                          ))}
                          <CommandEmpty>No results found.</CommandEmpty>
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                )}
              </div>

              <p className="pt-13 text-xl">Recents:</p>
              <div className="flex pt-2 gap-2">
                <RecentCard city="Stockholm" country="Sweden" icon={"ICON"} />
                <RecentCard city="Göteborg" country="Sweden" icon={"ICON"} />
                <RecentCard city="Malmö" country="Sweden" icon={"ICON"} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
