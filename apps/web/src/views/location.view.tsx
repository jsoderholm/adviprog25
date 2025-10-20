import { addDays, isWithinInterval, parseISO } from "date-fns";
import { CurrentWeatherCard } from "@/components/current-weather-card";
import {
  type ForecastRow,
  ForecastTable,
} from "@/components/forecast-table/forecast-table";
import { useForecastColumns } from "@/components/forecast-table/use-forecast-columns";
import { formatInTimeZone } from "@/lib/timezone";
import type { WeatherData } from "@/models/location.model";

const transformWeatherDataToForecastRows = (
  weatherData: WeatherData,
): ForecastRow[] => {
  const { daily, hourly } = weatherData.weather;
  const timeZone = weatherData.location.timezone;

  return daily.time.map((date, index) => {
    const dayStart = parseISO(date);
    const dayEnd = addDays(dayStart, 1);

    // Get hourly data for this day
    const dayHourlyData = hourly.time
      .map((hourTime, hourIndex) => ({
        time: hourTime,
        temperature: hourly.temperature_2m[hourIndex],
      }))
      .filter(({ time }) => {
        const hourDate = parseISO(time);
        return isWithinInterval(hourDate, { start: dayStart, end: dayEnd });
      });

    // Format children data
    const children = dayHourlyData.map(({ time, temperature }) => ({
      date: formatInTimeZone(
        time,
        timeZone,
        { hour: "2-digit", minute: "2-digit", hour12: false },
        "en-GB",
      ),
      temperature: `${Math.round(temperature)}°C`,
    }));

    // Format sunrise/sunset
    const sunrise = formatInTimeZone(
      daily.sunrise[index],
      timeZone,
      { hour: "2-digit", minute: "2-digit", hour12: false },
      "en-GB",
    );
    const sunset = formatInTimeZone(
      daily.sunset[index],
      timeZone,
      { hour: "2-digit", minute: "2-digit", hour12: false },
      "en-GB",
    );

    // Format precipitation
    const precipitationMm =
      Math.round(daily.precipitation_sum[index] * 10) / 10;
    const precipitationProbability = Math.round(
      daily.precipitation_probability_max[index],
    );
    const precipitation = `${precipitationMm} mm (${precipitationProbability}%)`;

    // Format temperature range
    const tempHigh = Math.round(daily.temperature_2m_max[index]);
    const tempLow = Math.round(daily.temperature_2m_min[index]);
    const temperature = `${tempHigh}°C / ${tempLow}°C`;

    return {
      date: formatInTimeZone(
        date,
        timeZone,
        { weekday: "long", month: "short", day: "numeric" },
      ),
      temperature,
      precipitation,
      windSpeed: `${Math.round(daily.wind_speed_10m_max[index] * 10) / 10} m/s`,
      sunriseSunset: `${sunrise} - ${sunset}`,
      children,
    };
  });
};

type LocationViewProps = {
  locationName: string;
  locationData: WeatherData;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
};

export const LocationView = (props: LocationViewProps) => {
  const columns = useForecastColumns();
  const forecastData = transformWeatherDataToForecastRows(props.locationData);
  const locationTimezone = props.locationData.location.timezone;

  return (
    <div className="grid gap-4">
      <CurrentWeatherCard
        isFavorite={props.isFavorite}
        onFavoriteToggle={props.onFavoriteToggle}
        date={props.locationData.weather.current.time}
        timezone={locationTimezone}
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
        weather_code={props.locationData.weather.current.weather_code}
      />
      <ForecastTable data={forecastData} columns={columns} />
    </div>
  );
};
