import { api } from "@repo/api";
import { authClient } from "@repo/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export type FavoriteData = {
  id: number;
  placeId: number;
  displayName: string;
  dateAdded: string;
  userId: string;
};

export function useFavorites() {
  return useQuery<FavoriteData[], Error>({
    queryKey: ["favorites"],
    queryFn: async () => {
      const session = await authClient.getSession();
      if (!session || !session.data) throw new Error("Not authenticated");
      const userId = session.data.user.id;
      const res = await api.favorites.$get({
        query: { user: userId },
      });
      if (!res.ok) throw new Error("Failed to fetch location");
      return res.json() as Promise<FavoriteData[]>;
    },
  });
}

export function useIsFavorite(placeId: string) {
  const { data: favorites } = useFavorites();
  return useMemo(() => {
    const favorite = favorites?.find(
      (fav) => fav.placeId.toString() == placeId
    );
    return favorite ? favorite : null;
  }, [favorites, placeId]);
}

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      placeId,
      locationName,
      lat,
      lon,
    }: {
      placeId: string;
      locationName: string;
      lat: string;
      lon: string;
    }) => {
      const session = await authClient.getSession();
      const userId = session?.data?.user.id;
      if (!userId) throw new Error("Not authenticated");

      return api.favorites.$post({
        json: {
          placeId: parseInt(placeId, 10),
          displayName: locationName,
          lat,
          lon,
          userId,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number | null) => {
      if (id === null) {
        throw new Error("Favorite ID is null");
      }
      return api.favorites.$delete({
        json: {
          id: id,
        },
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });
};
