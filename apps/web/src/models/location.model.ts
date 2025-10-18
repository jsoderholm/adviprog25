import { api } from "@repo/api";
import { useQuery } from "@tanstack/react-query";

export type WeatherData = {
  location: {
    latitude: number;
    longitude: number;
    elevation: number;
    timezone: string;
    timezoneAbbreviation: string;
    utcOffsetSeconds: number;
  };
  weather: {
    current: {
      time: string;
      relative_humidity_2m: number;
      apparent_temperature: number;
      wind_speed_10m: number;
      wind_direction_10m: number;
      precipitation: number;
      temperature_2m: number;
      is_day: number;
      wind_gusts_10m: number;
      rain: number;
      showers: number;
      snowfall: number;
      cloud_cover: number;
    };
    hourly: {
      time: string[];
      temperature_2m: number[];
      uv_index: number[];
    };
    daily: {
      time: string[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      precipitation_sum: number[];
      precipitation_hours: number[];
      precipitation_probability_max: number[];
      sunrise: string[];
      sunset: string[];
      wind_speed_10m_max: number[];
    };
  };
};

export function useWeather(lat: string, lon: string) {
  return useQuery<WeatherData, Error>({
    queryKey: ["weather", lat, lon],
    queryFn: async () => {
      const res = await api.weather.$get({
        query: { lat: lat, lon: lon },
      });
      if (!res.ok) throw new Error("Failed to fetch weather data for location");
      return res.json() as Promise<WeatherData>;
    },
  });
}
