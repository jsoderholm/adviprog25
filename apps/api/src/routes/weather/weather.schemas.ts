import { z } from "@hono/zod-openapi";

export const ParamsSchema = z.object({
  lat: z
    .string()
    .describe("Latitude of location to get weather for")
    .openapi({ example: "56.3293" }),
  lon: z
    .string()
    .describe("Longitude of location to get weather for")
    .openapi({ example: "12.1241" }),
});

export const WeatherResponseSchema = z
  .object({
    location: z
      .object({
        latitude: z.number().openapi({ example: 59.3293 }),
        longitude: z.number().openapi({ example: 18.0686 }),
        elevation: z.number().openapi({ example: 28.0 }),
        timezone: z.string().nullable().openapi({ example: "Europe/Berlin" }),
        timezoneAbbreviation: z
          .string()
          .nullable()
          .openapi({ example: "GMT+2" }),
        utcOffsetSeconds: z.number().openapi({ example: 7200 }),
      })
      .describe("Location data"),
    weather: z
      .object({
        current: z.object({
          time: z.string(),
          relative_humidity_2m: z.number().openapi({ example: 82 }),
          apparent_temperature: z.number().openapi({ example: 11.34 }),
          wind_speed_10m: z.number().openapi({ example: 6.82 }),
          wind_direction_10m: z.number().openapi({ example: 121 }),
          precipitation: z.number().openapi({ example: 0 }),
          temperature_2m: z.number().openapi({ example: 13.35 }),
          is_day: z.number().openapi({ example: 1 }),
          wind_gusts_10m: z.number().openapi({ example: 11.27 }),
          rain: z.number().openapi({ example: 0 }),
          showers: z.number().openapi({ example: 0 }),
          snowfall: z.number().openapi({ example: 0 }),
          cloud_cover: z.number().openapi({ example: 75 }),
          weather_code: z.number().openapi({ example: 3 }),
        }),
        hourly: z.object({
          time: z.array(z.string()).openapi({
            example: [
              "2025-09-30T00:00:00.000Z",
              "2025-09-30T01:00:00.000Z",
              "2025-09-30T02:00:00.000Z",
            ],
            description:
              "Array of date-time strings, where i-th element corresponds to the time midnight today + i hours. Use this to align with other hourly data arrays. 168 elements, covering 7 days.",
          }),
          temperature_2m: z
            .array(z.number())
            .openapi({
              example: [12.3, 11.8, 11.5],
              description:
                "Array of temperatures, where i-th element corresponds to the temperature at hour i from midnight. 168 elements, covering 7 days.",
            })
            .nullable(),
          uv_index: z
            .array(z.number())
            .openapi({
              example: [12.3, 11.8, 11.5],
              description:
                "An array of UV index values, where i-th element corresponds to the UV index at hour i from midnight. 168 elements, covering 7 days.",
            })
            .nullable(),
          weather_code: z
            .array(z.number())
            .openapi({
              example: [0, 3, 1],
              description:
                "An array of weather code values, where i-th element corresponds to the weather code at hour i from midnight. 168 elements, covering 7 days.",
            })
            .nullable(),
        }),
        daily: z.object({
          time: z.array(z.string()).openapi({
            example: [
              "2025-09-30T00:00:00.000Z",
              "2025-10-01T00:00:00.000Z",
              "2025-10-02T00:00:00.000Z",
              "2025-10-03T00:00:00.000Z",
              "2025-10-04T00:00:00.000Z",
              "2025-10-05T00:00:00.000Z",
              "2025-10-06T00:00:00.000Z",
            ],
            description:
              "Array of date-time strings, where i-th element corresponds to the time midnight today + i days. Use this to align with other daily data arrays. 7 elements, covering 7 days.",
          }),
          temperature_2m_max: z
            .array(z.number())
            .openapi({
              example: [15.6, 16.2, 14.8],
              description:
                "Array of maximum temperatures, where i-th element corresponds to the maximum temperature at day i from midnight today. 7 elements, covering 7 days.",
            })
            .nullable(),
          temperature_2m_min: z
            .array(z.number())
            .openapi({
              example: [8.4, 9.1, 7.8],
              description:
                "Array of minimum temperatures, where i-th element corresponds to the minimum temperature at day i from midnight today. 7 elements, covering 7 days.",
            })
            .nullable(),
          precipitation_sum: z
            .array(z.number())
            .openapi({
              example: [0, 0.2, 0],
              description:
                "Array of precipitation sums, where i-th element corresponds to the sum of precipitation at day i from midnight today. 7 elements, covering 7 days.",
            })
            .nullable(),
          precipitation_hours: z
            .array(z.number())
            .openapi({
              example: [0, 3, 0],
              description:
                "Array of precipitation hours, where i-th element corresponds to the number of hours with precipitation at day i from midnight today. 7 elements, covering 7 days.",
            })
            .nullable(),
          precipitation_probability_max: z
            .array(z.number())
            .openapi({
              example: [10, 50, 20],
              description:
                "Array of maximum probabilities of precipitation, where i-th element corresponds to the maximum probability of precipitation at day i from midnight today. 7 elements, covering 7 days.",
            })
            .nullable(),
          sunrise: z.array(z.string()).openapi({
            example: [
              "2025-09-30T05:45:00.000Z",
              "2025-10-01T05:46:00.000Z",
              "2025-10-02T05:48:00.000Z",
            ],
            description:
              "Array of date-time strings, where i-th element corresponds to the time of sunrise at midnight today + i days. 7 elements, covering 7 days.",
          }),
          sunset: z.array(z.string()).openapi({
            example: [
              "2025-09-30T17:45:00.000Z",
              "2025-10-01T17:43:00.000Z",
              "2025-10-02T17:42:00.000Z",
            ],
            description:
              "Array of date-time strings, where i-th element corresponds to the time of sunset at midnight today + i days. 7 elements, covering 7 days.",
          }),
          wind_speed_10m_max: z
            .array(z.number())
            .openapi({
              example: [12.3, 11.8, 11.5],
              description:
                "Array of maximum wind speeds, where i-th element corresponds to the maximum wind speed at day i from midnight today. 7 elements, covering 7 days.",
            })
            .nullable(),
          weather_code: z
            .array(z.number())
            .openapi({
              example: [0, 3, 1],
              description:
                "Array of weather codes, where i-th element corresponds to the weather code of day i from midnight today. 7 elements, covering 7 days.",
            })
            .nullable(),
        }),
      })
      .describe("Weather data for the given location"),
  })
  .describe("Location and weather data")
  .nullable();
