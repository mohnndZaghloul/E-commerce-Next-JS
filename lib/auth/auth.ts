import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../prisma";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "../send-email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      const token = url.split("/").pop()?.split("?")[0];
      const customUrl = `http://localhost:3000/reset-password?token=${token}`;
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: `<h1>hello from e-commerce we need you to <a href=${customUrl}>Reset Password</a></h1>`,
      });
    },
  },
  plugins: [nextCookies()],
});
