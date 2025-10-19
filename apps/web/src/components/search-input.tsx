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
  queryLength: number;
  isDebouncing: boolean;
  suggestions: LocationsData;
  handleInputChange: (query: string) => void;
  handleSelect: (location: LocationsData[number]) => void;
  isFetching: boolean;
};

export const LocationSearchInput = ({
  queryLength,
  isDebouncing,
  suggestions,
  handleInputChange,
  handleSelect,
  isFetching,
}: LocationSearchInputProps) => (
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
          {queryLength === 0 && (
            <CommandEmpty>Search for any location!</CommandEmpty>
          )}
          {queryLength > 0 && queryLength < 3 && (
            <CommandEmpty>Enter at least 3 characters.</CommandEmpty>
          )}
          {queryLength > 2 && (
            <>
              {isFetching ||
                (isDebouncing && (
                  <CommandLoading progress={10}>
                    <Spinner className="mx-auto mt-4 mb-4 size-4" />
                  </CommandLoading>
                ))}
              {!isFetching && !isDebouncing && (
                <>
                  <CommandEmpty>No locations found.</CommandEmpty>
                  <CommandGroup>
                    {suggestions?.map((s) => (
                      <CommandItem
                        key={s.place_id}
                        value={`${s.display_name} (${s.place_id})`}
                        onSelect={() => handleSelect(s)}
                      >
                        {s.display_name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </>
          )}
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
);
