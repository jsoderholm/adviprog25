import { api } from "@repo/api";
import { queryOptions } from "@tanstack/react-query";
import {
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  HelpCircle,
  SunMedium,
} from "lucide-react";

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
      weather_code: number;
    };
    hourly: {
      time: string[];
      temperature_2m: number[];
      uv_index: number[];
      weather_code: number[];
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
      weather_code: number[];
    };
  };
};

export const weatherQueryOptions = (lat: string, lon: string) =>
  queryOptions({
    queryKey: ["weather", lat, lon],
    queryFn: async () => {
      const res = await api.weather.$get({
        query: { lat: lat, lon: lon },
      });
      if (!res.ok) throw new Error("Failed to fetch weather data for location");
      return res.json() as Promise<WeatherData>;
    },
  });

type IconData = {
  icon: React.ElementType;
  text: string;
};

const weatherMap: Record<number, IconData> = {
  0: { icon: SunMedium, text: "Clear" },
  1: { icon: CloudSun, text: "Mostly Clear" },
  2: { icon: CloudSun, text: "Partly Cloudy" },
  3: { icon: Cloudy, text: "Overcast" },
  45: { icon: CloudFog, text: "Fog" },
  48: { icon: CloudFog, text: "Icy Fog" },
  51: { icon: CloudDrizzle, text: "Light Drizzle" },
  53: { icon: CloudDrizzle, text: "Drizzle" },
  55: { icon: CloudDrizzle, text: "Heavy Drizzle" },
  56: { icon: CloudDrizzle, text: "Light Freezing Drizzle" },
  57: { icon: CloudDrizzle, text: "Freezing Drizzle" },
  61: { icon: CloudRain, text: "Light Rain" },
  63: { icon: CloudRain, text: "Rain" },
  65: { icon: CloudRain, text: "Heavy Rain" },
  66: { icon: CloudRain, text: "Light Freezing Rain" },
  67: { icon: CloudRain, text: "Freezing Rain" },
  80: { icon: CloudRain, text: "Light Showers" },
  81: { icon: CloudRain, text: "Showers" },
  82: { icon: CloudRain, text: "Heavy Showers" },
  71: { icon: CloudSnow, text: "Light Snow" },
  73: { icon: CloudSnow, text: "Snow" },
  75: { icon: CloudSnow, text: "Heavy Snow" },
  77: { icon: CloudSnow, text: "Snow Grains" },
  85: { icon: CloudSnow, text: "Light Snow Showers" },
  86: { icon: CloudSnow, text: "Snow Showers" },
  95: { icon: CloudLightning, text: "Thunder" },
  96: { icon: CloudLightning, text: "Thunder" },
  99: { icon: CloudLightning, text: "Thunder" },
};

export function weatherIcon(code: number): IconData {
  return weatherMap[code] ?? { icon: HelpCircle, text: "Unknown" };
}
