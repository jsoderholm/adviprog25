import { z } from "@hono/zod-openapi";

export const ParamsSchema = z.object({
  search: z
    .string()
    .min(3)
    .max(100)
    .describe("Location to search for")
    .openapi({ example: "Stockholm" }),
});

export const GeocodeResponseSchema = z.array(
  z.object({
    place_id: z.number().openapi({ example: 123456789 }),
    licence: z.string().openapi({
      example:
        "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    }),
    osm_type: z.string().openapi({ example: "relation" }),
    osm_id: z.number().openapi({ example: 123456 }),
    boundingbox: z
      .array(z.string())
      .openapi({ example: ["59.3083", "59.3533", "18.0200", "18.0800"] }),
    lat: z.string().openapi({ example: "59.3293" }),
    lon: z.string().openapi({ example: "18.0686" }),
    display_name: z.string().openapi({ example: "Stockholm, Sweden" }),
    class: z.string().openapi({ example: "boundary" }),
    type: z.string().openapi({ example: "administrative" }),
    importance: z.number().openapi({ example: 0.852 }),
  })
);
