import path from "node:path";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import z from "zod";

expand(
  config({
    path: path.resolve(process.cwd(), ".env"),
    quiet: true,
  }),
);

const stringBoolean = z.coerce
  .string()
  .transform((val) => {
    return val === "true";
  })
  .default(false);

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum([
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
    "silent",
  ]),

  DATABASE_URL: z.url(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number(),
  DB_MIGRATING: stringBoolean,

  BETTER_AUTH_URL: z.url(),
  BETTER_AUTH_SECRET: z.string(),
  RESEND_API_KEY: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;

const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error("Invalid environment variables:");
  console.error(z.flattenError(error).fieldErrors);
  process.exit(1);
}

export default env!;
