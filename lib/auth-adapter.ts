import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./db"
import type { Adapter } from "next-auth/adapters"

const adapter = PrismaAdapter(db)

export const CustomPrismaAdapter: Adapter = {
  ...adapter,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createUser: async ({ id, ...data }: any) => {
    return db.user.create({ data }) as any
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkAccount: async (account: any) => {
    return db.account.create({
      data: {
        userId: account.userId,
        type: account.type,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        accessToken: account.access_token,
        refreshToken: account.refresh_token,
        idToken: account.id_token,
        expiresAt: account.expires_at,
        tokenType: account.token_type,
        scope: account.scope,
        sessionState: account.session_state,
      }
    }) as any
  },
}