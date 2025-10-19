import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const landingPageSearchSchema = z.object({
  query: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/")({
  validateSearch: zodValidator(landingPageSearchSchema),
  search: {
    middlewares: [stripSearchParams({ query: "" })],
  },
  loaderDeps: ({ search }) => search,
});
