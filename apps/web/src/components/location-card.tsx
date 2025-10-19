import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCardBackgroundStyles } from "@/lib/utils";

export type Location = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};

type LocationCardProps = {
  location: Location;
  handleNavigate: (location: Location) => void;
  children?: React.ReactNode;
};

export const LocationCard = ({
  location,
  handleNavigate,
  children,
}: LocationCardProps) => (
  <Card
    className={`${getCardBackgroundStyles()} cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]`}
    onClick={() => handleNavigate(location)}
  >
    <CardHeader>
      <CardTitle className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {location.display_name}
      </CardTitle>
      <CardDescription>{location.display_name}</CardDescription>
    </CardHeader>
    <CardContent className="flex justify-end mt-auto">{children}</CardContent>
  </Card>
);
