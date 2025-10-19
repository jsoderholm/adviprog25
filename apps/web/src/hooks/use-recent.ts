import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LocationsData } from "@/models/landing.model";

export type Location = {
  lat: string;
  lon: string;
  name: string;
  place_id: number;
};

export type LocationHistoryStore = {
  history: LocationsData;
  append: (location: LocationsData[number]) => void;
};

export const useRecentLocationStore = create<LocationHistoryStore>()(
  persist(
    (set) => ({
      history: [],
      append: (location: LocationsData[number]) =>
        set(({ history }) => {
          const existing = history.find(
            (existing: LocationsData[number]) =>
              existing.lat === location.lat && existing.lon === location.lon,
          );

          if (existing) return { history };

          return { history: [...history, location] };
        }),
    }),
    {
      name: "recent-locations",
    },
  ),
);
