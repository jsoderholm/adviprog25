import { z } from "@hono/zod-openapi";

export const GetParamsSchema = z.object({
  user: z
    .string()
    .describe("Id of the user to get favorites for")
    .openapi({ example: "31481398530581095" }),
});

export const GetAllResponseSchema = z.array(
  z.object({
    id: z.number().openapi({ example: 123456789 }),
    displayName: z.string().openapi({ example: "Stockholm" }),
    lat: z.string().openapi({ example: "59.3293" }).nullable(),
    lon: z.string().openapi({ example: "18.0686" }).nullable(),
    placeId: z.number().openapi({ example: 987654321 }),
    dateAdded: z.date().openapi({ example: "2024-01-01T12:00:00Z" }).nullable(),
    userId: z.string().openapi({ example: "31481398530581095" }),
  })
);

export const CreateFavoriteSchema = z.object({
  placeId: z.number().openapi({ example: 123456789 }),
  displayName: z
    .string()
    .describe("Display name of the favorite location")
    .openapi({ example: "Stockholm" }),
  lat: z.string().openapi({ example: "59.3293" }).nullable(),
  lon: z.string().openapi({ example: "18.0686" }).nullable(),
  userId: z
    .string()
    .describe("Id of the user adding the favorite")
    .openapi({ example: "31481398530581095" }),
});

export const DeleteFavoriteSchema = z.object({
  id: z.number().openapi({ example: 123456789 }),
});
