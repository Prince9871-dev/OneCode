import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { CustomPrismaAdapter } from "./lib/auth-adapter";
import { db } from "./lib/db";
import { DEFAULT_LOGIN_REDIRECT } from "./routes";
import { UserRole } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: CustomPrismaAdapter,
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Ensure post-login goes to DEFAULT_LOGIN_REDIRECT unless a safe internal URL is provided.
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        const parsed = new URL(url);
        if (parsed.origin === baseUrl) return url;
      } catch {
        // ignore
      }
      return `${baseUrl}${DEFAULT_LOGIN_REDIRECT}`;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) session.user.id = token.sub;
        if (token.role) session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        // If role is present on the user object during sign-in, persist it.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.role = (user as any).role ?? token.role;
      }

      // Backfill role from DB for subsequent requests (Node runtime only).
      if (token.sub && !token.role) {
        const dbUser = await db.user.findUnique({
          where: { id: token.sub },
          select: { role: true },
        });
        token.role = dbUser?.role ?? token.role;
      }

      if (!token.role) token.role = UserRole.USER;

      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
});