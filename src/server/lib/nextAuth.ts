import { env } from '@/const/env';
import NextAuthGitHubProvider from 'next-auth/providers/github';
import { z } from 'zod';
import type { NextAuthOptions } from 'next-auth';

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
      };
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
} satisfies NextAuthOptions;
