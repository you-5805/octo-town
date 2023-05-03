import { env } from '@/const/env';
import NextAuthGitHubProvider from 'next-auth/providers/github';
import { z } from 'zod';
import type { JWT } from 'next-auth/jwt';
import type { DefaultSession, NextAuthOptions, Session } from 'next-auth';

const profileSchema = z.object({
  id: z.number(),
});

export const nextAuthOptions = {
  providers: [
    NextAuthGitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      const parsed = profileSchema.safeParse(profile);
      if (!parsed.success || !account) return token;

      return {
        ...token,
        id: parsed.data.id,
        accessToken: account.access_token,
      } as JWT & { id: number; accessToken: string };
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        userId: token.id,
      } as (Session | DefaultSession) & { accessToken: string; userId: number };
    },
  },
} satisfies NextAuthOptions;
