import { api } from "@repo/api";
import { authClient } from "@repo/api";
import { useQuery } from "@tanstack/react-query";

export type FavoriteData = {
  id: number;
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
