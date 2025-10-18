import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Location = {
  lat: string;
  lon: string;
  name: string;
};

export type LocationHistoryStore = {
  history: Location[];
  append: (location: Location) => void;
};

export const useRecentLocationStore = create<LocationHistoryStore>()(
  persist(
    (set) => ({
      history: [],
      append: (location: Location) =>
        set(({ history }) => {
          const existing = history.find(
            (existing) =>
              existing.lat === location.lat && existing.lon === location.lon,
          );

          if (existing) return { history };

          return { history: [...history, location] };
        }),
    }),
    {
      name: "location-history",
    },
  ),
);
