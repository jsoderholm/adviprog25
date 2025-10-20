import {
  Cloud,
  Droplet,
  Heart,
  Thermometer,
  Wind,
  WindArrowDownIcon,
} from "lucide-react";
import { getCardBackgroundStyles } from "@/lib/utils";
import { formatInTimeZone } from "@/lib/timezone";
import type { WeatherData } from "@/models/location.model";
import { weatherIcon } from "@/models/location.model";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type CurrentWeatherCardProps = CurrentWeather & {
  date: string;
  location: string;
  timezone: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
};

type CurrentWeather = Pick<
  WeatherData["weather"]["current"],
  | "relative_humidity_2m"
  | "apparent_temperature"
  | "wind_speed_10m"
  | "precipitation"
  | "temperature_2m"
  | "wind_gusts_10m"
  | "weather_code"
>;

export function CurrentWeatherCard(props: CurrentWeatherCardProps) {
  const { icon: Icon, text } = weatherIcon(props.weather_code);
  const formattedDate = formatInTimeZone(
    props.date,
    props.timezone,
    { day: "numeric", month: "long" },
    "en-GB",
  );
  return (
    <Card className={getCardBackgroundStyles()}>
      <CardHeader>
        <CardTitle className="text-2xl">{props.location}</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
        <CardAction>
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={props.onFavoriteToggle}
          >
            Favorite
            <Heart
              className={
                props.isFavorite ? "text-black dark:text-white" : undefined
              }
              fill={props.isFavorite ? "currentColor" : "none"}
            />
          </Button>
        </CardAction>
      </CardHeader>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 items-center">
        <div className="row-span-3 sm:row-span-2 overflow-hidden">
          <InformationBadge
            label={text}
            icon={<Icon className="size-50" />}
            value={""}
          />
        </div>
        <InformationBadge
          label="Temperature"
          icon={<Thermometer className="size-5" />}
          value={`${props.temperature_2m.toFixed(1)}°C`}
        />
        <InformationBadge
          label="Feels Like"
          icon={<Thermometer className="size-5" />}
          value={`${props.apparent_temperature.toFixed(1)}°C`}
        />
        <InformationBadge
          label="Humidity"
          icon={<Cloud className="size-5" />}
          value={`${props.relative_humidity_2m.toFixed(1)} %`}
        />
        <InformationBadge
          label="Wind Speed"
          icon={<Wind className="size-5" />}
          value={`${props.wind_speed_10m.toFixed(1)} m/s`}
        />
        <InformationBadge
          label="Wind Gusts"
          icon={<WindArrowDownIcon className="size-5" />}
          value={`${props.wind_gusts_10m.toFixed(1)} m/s`}
        />
        <InformationBadge
          label="Percipitation"
          icon={<Droplet className="size-5" />}
          value={`${props.precipitation.toFixed(1)} mm`}
        />
      </div>
    </Card>
  );
}

type InformationBadgeProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
};

const InformationBadge = ({ label, icon, value }: InformationBadgeProps) => {
  return (
    <div className="flex flex-col items-center gap-0">
      {icon}
      <span className="text-muted-foreground text-xs uppercase tracking-wider mt-1">
        {label}
      </span>
      <span className="text-lg font-medium">{value}</span>
    </div>
  );
};
