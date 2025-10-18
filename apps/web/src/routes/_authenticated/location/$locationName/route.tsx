import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { weatherQueryOptions } from "@/models/location.model";

const locationSearchSchema = z.object({
  lat: z.string().min(1, "Latitude is required"),
  lon: z.string().min(1, "Longitude is required"),
});

export const Route = createFileRoute("/_authenticated/location/$locationName")({
  validateSearch: zodValidator(locationSearchSchema),
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps: { lat, lon } }) =>
    await queryClient.prefetchQuery(weatherQueryOptions(lat, lon)),
});
