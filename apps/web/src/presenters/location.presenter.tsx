import { useSuspenseQuery } from "@tanstack/react-query";
import { weatherQueryOptions } from "@/models/location.model";
import { LocationView } from "@/views/location.view";

type LocationPresenterProps = {
  locationName: string;
  lat: string;
  lon: string;
};

export const LocationPresenter = ({
  locationName,
  lat,
  lon,
}: LocationPresenterProps) => {
  const { data } = useSuspenseQuery(weatherQueryOptions(lat, lon));
  return <LocationView locationName={locationName} locationData={data} />;
};
