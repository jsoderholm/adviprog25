import type { AppModel } from "@/model";
import { Header } from "../-components/header";
import { WeatherInfoCard } from "../-components/weatherInfoCard";

export function SearchresultsView(props: {
  locationData: AppModel["apiTestResponse"];
}) {
  return (
    <div className="w-full">
      <Header></Header>
      <div className="grid grid-cols-20 grid-rows-4 gap-4 p-2 pb-4 pr-4 h-10/12">
        <div className="col-span-8 row-span-3 bg-gradient-to-t from-gray-600 to-background rounded-xl"></div>
        <div className="col-start-10 col-span-11 row-span-4">
          <WeatherInfoCard
            dailyData={props.locationData.weather.daily}
            hourlyData={props.locationData.weather.hourly}
          />
        </div>
      </div>
    </div>
  );
}
