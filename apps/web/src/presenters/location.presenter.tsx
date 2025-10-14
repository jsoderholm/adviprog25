import { useWeather } from "@/models/location.model";
import { LocationView } from "@/views/location.view";
type LocationPresenterProps = {
  locationName: string;
};

export const LocationPresenter = ({ locationName }: LocationPresenterProps) => {
  const { data, error, isLoading } = useWeather(locationName);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <LocationView locationName={locationName} locationData={data!} />;
};
