import { env } from '@/const/env';
import NextAuthGitHubProvider from 'next-auth/providers/github';
import type { NextAuthOptions } from 'next-auth';

export const nextAuthOptions = {
  providers: [
    NextAuthGitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthOptions;
