import { useQuery } from "@tanstack/react-query";
import { api } from "@repo/api";

export type LocationsData = [
  {
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
  }
];
export function useSuggestedLocations(searchString: string, enabled = true) {
  return useQuery<LocationsData, Error>({
    queryKey: ["locations", searchString],
    queryFn: async () => {
      const res = await api.geocode.$get({
        query: { search: searchString },
      });
      if (!res.ok) throw new Error("Failed to fetch location");
      return res.json() as Promise<LocationsData>;
    },
    enabled: enabled,
  });
}
