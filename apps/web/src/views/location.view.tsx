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
    <div className="w-full">
      <h1 className="text-3xl font-bold p-4">Weather at: {locationName}</h1>
      <div className="grid grid-cols-20 grid-rows-4 gap-4 p-2 pb-4 pr-4 h-10/12">
        <div className="col-span-8 row-span-3 bg-gradient-to-t from-gray-600 to-background rounded-xl"></div>
        <div className="col-start-10 col-span-11 row-span-4">
          <WeatherInfoCard
            dailyData={locationData.weather.daily}
            hourlyData={locationData.weather.hourly}
          />
        </div>
      </div>
    </div>
  );
};
