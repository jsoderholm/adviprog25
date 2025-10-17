import { Icon } from "lucide-react";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type CurrentWeatherProps = {
  date: string;
  relative_humidity_2m: number;
  apparent_temperature: number;
  wind_speed_10m: number;
  precipitation: number;
  temperature_2m: number;
  wind_gusts_10m: number;
  location: string;
  isDisabled: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  homeSelected: boolean;
  favoriteSelected: boolean;
  handleFavoriteChange: () => void;
  handleHomeChange: () => void;
};

export function CurrentWeatherCard(props: CurrentWeatherProps) {
  const formattedDate = new Date(props.date).toLocaleString("en-EN", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  function formatDate(): string {
    const date = new Date(props.date);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
    };
    const h = date.getUTCHours().toString().padStart(2, "0");
    const m = date.getUTCMinutes().toString().padStart(2, "0");
    return date.toLocaleDateString("en-US", options) + " " + `${h}:${m}`;
  }

  return (
    <div className="w-full border-gray-700 text-gray-200 p-4 pl-6 flex flex-col gap-6">
      {/* Location + Date */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-700 pb-2">
        <div>
          <h2 className="text-4xl font-semibold pb-1">{props.location}</h2>
          <span className="text-[16px] text-gray-800 mr-4">{formatDate()}</span>
        </div>

        <div className="flex flex-row">
          <button
            type="button"
            className="mr-2 hover:bg-primary/10 hover:cursor-pointer"
            onClick={props.handleFavoriteChange}
          >
            {props.favoriteSelected ? (
              <Icons.favoriteSelected />
            ) : (
              <Icons.favorite />
            )}
          </button>
          <button
            type="button"
            className="hover:bg-primary/10 hover:cursor-pointer"
            onClick={props.handleHomeChange}
          >
            {props.homeSelected ? <Icons.homeSelected /> : <Icons.home />}
          </button>
        </div>
      </div>
      {/* Main data grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
          <span className="text-gray-800 text-xs uppercase tracking-wider">
            Temperature
          </span>
          <span className="text-lg font-medium">
            {props.temperature_2m.toFixed(1)}°C
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-800 text-xs uppercase tracking-wider">
            Feels Like
          </span>
          <span className="text-lg font-medium">
            {props.apparent_temperature.toFixed(1)}°C
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-800 text-xs uppercase tracking-wider">
            Humidity
          </span>
          <span className="text-lg font-medium">
            {props.relative_humidity_2m}%
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-800 text-xs uppercase tracking-wider">
            Wind Speed
          </span>
          <span className="text-lg font-medium">
            {props.wind_speed_10m.toFixed(1)} m/s
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-800 text-xs uppercase tracking-wider">
            Wind Gusts
          </span>
          <span className="text-lg font-medium">
            {props.wind_gusts_10m.toFixed(1)} m/s
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-800 text-xs uppercase tracking-wider">
            Precipitation
          </span>
          <span className="text-lg font-medium">
            {props.precipitation.toFixed(1)} mm
          </span>
        </div>
      </div>
      <div className="flex w-[75%] items-center gap-2">
        <Input
          type="city"
          placeholder="Find a new city..."
          onChange={props.handleInputChange}
          className="rounded-none placeholder:text-primary placeholder:text-[1.1rem] border-gray-400"
        />
        <Button
          type="button"
          variant="default"
          className="rounded-none text-[1.05rem] text-gray-700"
          onClick={props.handleSearch}
          disabled={props.isDisabled}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
