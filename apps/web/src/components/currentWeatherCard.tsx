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
};

export function CurrentWeatherCard(props: CurrentWeatherProps) {
  const formattedDate = new Date(props.date).toLocaleString("en-US", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full border-gray-700 text-gray-200 p-4 pl-6 flex flex-col gap-6">
      {/* Location + Date */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-700 pb-2">
        <h2 className="text-3xl font-semibold pb-1">{props.location}</h2>
        <span className="text-[16px] text-gray-700">{formattedDate}</span>
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
      {/* Search bar */}
      <div className="flex w-[75%] items-center gap-2">
        <Input
          type="city"
          placeholder="Search..."
          //onChange={handleInputChange}
          className="rounded-none placeholder:text-primary placeholder:text-[1.1rem] border-gray-400"
        />
        <Button
          type="button"
          variant="default"
          className="rounded-none text-[1.05rem] text-gray-700"
          //onClick={handleSearch}
          //disabled={isDisabled}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
