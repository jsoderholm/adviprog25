import { CurrentWeatherCard } from "@/components/currentWeatherCard";
import { WeatherInfoCard } from "@/components/weatherInfoCard";
import type { WeatherData } from "@/models/location.model";

type LocationViewProps = {
  locationName: string;
  locationData: WeatherData;
};

export const LocationView = ({
  locationName,
  locationData,
}: LocationViewProps) => {
  return (
    <div className="w-full flex flex-col flex-1 overflow-hidden p-2 pb-4 pr-4 gap-4 justify-center items-center">
      {/* fixed-size header block */}
      <div className="relative rounded-xl overflow-hidden w-15/20">
        {/* Background layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-yellow-300 brightness-70"></div>

        {/* Foreground content */}
        <div className="relative p-4">
          <CurrentWeatherCard
            date={locationData.weather.current.time}
            relative_humidity_2m={
              locationData.weather.current.relative_humidity_2m
            }
            apparent_temperature={
              locationData.weather.current.apparent_temperature
            }
            wind_speed_10m={locationData.weather.current.wind_speed_10m}
            precipitation={locationData.weather.current.precipitation}
            temperature_2m={locationData.weather.current.temperature_2m}
            wind_gusts_10m={locationData.weather.current.wind_gusts_10m}
            location={locationName}
          />
        </div>
      </div>

      {/* scrollable WeatherInfoCard section below */}
      <div className="flex-1 overflow-y-auto rounded-xl w-14/20">
        <WeatherInfoCard
          dailyData={locationData.weather.daily}
          hourlyData={locationData.weather.hourly}
        />
      </div>
    </div>
  );
};
