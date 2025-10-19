import { CommandLoading } from "cmdk";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { LocationsData } from "@/models/landing.model";
import { Spinner } from "./ui/spinner";

type LocationSearchInputProps = {
  suggestions: LocationsData;
  handleInputChange: (query: string) => void;
  handleSelect: (location: LocationsData[number]) => void;
  isFetching: boolean;
};

export function LocationSearchInput({
  suggestions,
  handleInputChange,
  handleSelect,
  isFetching,
}: LocationSearchInputProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full md:w-[350px] justify-between"
        >
          Search
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="md:w-[350px] p-0">
        <Command>
          <CommandInput
            placeholder="Search..."
            className="h-9"
            onValueChange={handleInputChange}
          />
          <CommandList>
            {isFetching && (
              <CommandLoading>
                <Spinner className="mx-auto mt-2 size-4" />
              </CommandLoading>
            )}
            {!isFetching && <CommandEmpty>No locations found.</CommandEmpty>}
            <CommandGroup>
              {suggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion.place_id}
                  value={suggestion.display_name}
                  onSelect={() => handleSelect(suggestion)}
                >
                  {suggestion.display_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
