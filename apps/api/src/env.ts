import path from "node:path";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import z from "zod";

expand(
  config({
    path: path.resolve(
      process.cwd(),
      process.env.NODE_ENV === "test" ? ".env.test" : ".env",
    ),
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
  DATABASE_URL: z.url(),
  LOG_LEVEL: z.enum([
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
    "silent",
  ]),
  DB_MIGRATING: stringBoolean,
});

export type Env = z.infer<typeof EnvSchema>;

let env: Env;

try {
  env = EnvSchema.parse(process.env);
} catch (e) {
  const error = e as z.ZodError;
  console.error(z.flattenError(error).fieldErrors);
  process.exit(1);
}

export default env;
