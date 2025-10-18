import { CurrentWeatherCard } from "@/components/currentWeatherCard";
import { WeatherInfoCard } from "@/components/weatherInfoCard";
import type { WeatherData } from "@/models/location.model";

type LocationViewProps = {
  locationName: string;
  locationData: WeatherData;
  isDisabled: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  homeSelected: boolean;
  favoriteSelected: boolean;
  handleFavoriteChange: () => void;
  handleHomeChange: () => void;
};

export const LocationView = (props: LocationViewProps) => {
  return (
    <div className="w-full flex flex-col flex-1 overflow-hidden p-4 pl-2 gap-4 justify-center items-center">
      <div className="relative rounded-xl overflow-hidden w-15/20">
        <div className="absolute inset-0 brightness-100 opacity-70 bg-gradient-to-t from-blue-400 via-sky-500 to-blue-700"></div>

        <div className="relative p-4">
          <CurrentWeatherCard
            date={props.locationData.weather.current.time}
            relative_humidity_2m={
              props.locationData.weather.current.relative_humidity_2m
            }
            apparent_temperature={
              props.locationData.weather.current.apparent_temperature
            }
            wind_speed_10m={props.locationData.weather.current.wind_speed_10m}
            precipitation={props.locationData.weather.current.precipitation}
            temperature_2m={props.locationData.weather.current.temperature_2m}
            wind_gusts_10m={props.locationData.weather.current.wind_gusts_10m}
            location={props.locationName}
            isDisabled={props.isDisabled}
            handleInputChange={props.handleInputChange}
            handleSearch={props.handleSearch}
            homeSelected={props.homeSelected}
            favoriteSelected={props.favoriteSelected}
            handleFavoriteChange={props.handleFavoriteChange}
            handleHomeChange={props.handleHomeChange}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto rounded-xl w-14/20">
        <WeatherInfoCard
          daily={props.locationData.weather.daily}
          hourly={props.locationData.weather.hourly}
        />
      </div>
    </div>
  );
};
