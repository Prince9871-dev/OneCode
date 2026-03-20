import { UserRole } from "@prisma/client";
import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

/**
 * Extend the default NextAuth user
 * Add role from Prisma UserRole enum
 */

//“Hey NextAuth, my user also has a role. Please remember that.”
export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
  }
}