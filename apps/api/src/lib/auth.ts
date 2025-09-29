import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import db from "../db";
import { email } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await email({
        to: user.email,
        subject: "Verify your email address",
        text: "Click here to verify your email",
        url,
      });
    },
    sendOnSignUp: true,
  },
  telemetry: { enabled: false },
  plugins: [openAPI()],
});
