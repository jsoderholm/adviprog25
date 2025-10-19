import { api } from "@repo/api";
import {
  mutationOptions,
  type QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import { authQueryOptions } from "@/lib/query/auth-queries";

export type FavoriteData = {
  id: number;
  placeId: number;
  displayName: string;
  dateAdded: string;
  userId: string;
};

export function useFavorites() {
  const queryClient = useQueryClient();
  return useQuery<FavoriteData[], Error>({
    queryKey: ["favorites"],
    queryFn: async () => {
      const session = await queryClient.fetchQuery(authQueryOptions);
      if (!session.data) throw new Error("Not authenticated");

      const res = await api.favorites.$get({
        query: { user: session.data.user.id },
      });

      if (!res.ok) throw new Error("Failed to fetch location");
      return res.json() as Promise<FavoriteData[]>;
    },
  });
}

export function useIsFavorite(placeId: number) {
  const { data } = useFavorites();

  return useMemo(
    () => data?.find((fav) => fav.placeId === placeId) ?? null,
    [data, placeId],
  );
}

const addFavoriteMutationOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationFn: async ({
      placeId,
      locationName,
    }: {
      placeId: number;
      locationName: string;
    }) => {
      const session = await queryClient.fetchQuery(authQueryOptions);
      if (!session.data) {
        toast.error("Not authenticated");
        return;
      }

      return api.favorites.$post({
        json: {
          placeId: placeId,
          displayName: locationName,
          userId: session.data.user.id,
        },
      });
    },
    onError: () => toast.error("Oh no! Something went wrong."),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success(`Successfully added location to favorites!`);
    },
  });

export const removeFavoriteMutationOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationFn: (id: number) =>
      api.favorites.$delete({
        json: {
          id: id,
        },
      }),
    onError: () => toast.error("Oh no! Something went wrong."),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success(`Successfully removed location from favorites!`);
    },
  });

export const useFavoritesMutation = () => {
  const queryClient = useQueryClient();

  const removeMutation = useMutation(
    removeFavoriteMutationOptions(queryClient),
  );
  const addMutation = useMutation(addFavoriteMutationOptions(queryClient));

  return { removeMutation, addMutation };
};
