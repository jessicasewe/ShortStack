import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import axios from "axios";
import { ZodError } from "zod";
import { backendUrl } from "./constants/env";

declare module "next-auth" {
  interface User {
    accessToken: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        try {
          let user = null;

          if (!credentials) {
            throw new Error("Please provide all the required details");
          }

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const response = await axios.post(`${backendUrl}/api/auth/login`, {
            email,
            password,
          });

          user = {
            id: response?.data?.user?._id as string,
            name: response?.data?.user?.firstName,
            email: response?.data?.user?.email,
            accessToken: response?.data?.token,
          };

          return user;
        } catch (error) {
          console.log(error);
          if (error instanceof ZodError) {
            throw new Error("Invalid credentials format.");
          }

          if (axios.isAxiosError(error)) {
            throw new Error(
              error.response?.data?.message || "Authentication failed."
            );
          }

          throw new Error("Unexpected error during authentication.");
        }
      },
    }),
  ],

  pages: { signIn: "/auth/login" },

  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60,
  },

  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
});
