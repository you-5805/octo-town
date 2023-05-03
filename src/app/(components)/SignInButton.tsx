'use client';

import { Button } from '@/components/Button';
import { signIn, signOut } from 'next-auth/react';

export const SignInButton = () => {
  return <Button onClick={() => signIn('github')}>Sign in with GitHub</Button>;
};

export const SignOutButton = () => {
  return <Button onClick={() => signOut()}>Sign out</Button>;
};
