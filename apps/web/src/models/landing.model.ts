import { api } from "@repo/api";
import { useQuery } from "@tanstack/react-query";

export type LocationsData = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}[];

type UseSuggestedLocationsParams = {
  query: string;
  enabled: boolean;
};

export function useSuggestedLocations({
  query,
  enabled,
}: UseSuggestedLocationsParams) {
  return useQuery<LocationsData, Error>({
    queryKey: ["locations", query],
    queryFn: async () => {
      const res = await api.geocode.$get({
        query: { search: query },
      });
      if (!res.ok) throw new Error("Failed to fetch location");
      return res.json() as Promise<LocationsData>;
    },
    enabled,
  });
}
