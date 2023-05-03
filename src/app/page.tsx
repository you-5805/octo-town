import { SignInButton, SignOutButton } from './(components)/SignInButton';
import { nextAuthOptions } from '@/server/lib/nextAuth';
import { getServerSession } from 'next-auth/next';

export default async function Page() {
  const session = await getServerSession(nextAuthOptions);

  console.log({ session });

  return <>{session === null ? <SignInButton /> : <SignOutButton />}</>;
}
