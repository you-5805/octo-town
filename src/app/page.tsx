import { SignInButton, SignOutButton } from './(components)/SignInButton';
import { nextAuthOptions } from '@/server/lib/nextAuth';
import { octokit } from '@/server/lib/octokit';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image';

export default async function Page() {
  const session = await getServerSession(nextAuthOptions);
  if (session === null) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <SignInButton />
      </div>
    );
  }

  const { data: users } = await octokit(
    session.accessToken
  ).users.listFollowedByAuthenticatedUser();

  return (
    <div className='grid gap-8 p-8'>
      <div className='text-center'>
        <SignOutButton />
      </div>
      <ul className='grid gap-8 sm:grid-cols-2'>
        {users.map((user) => (
          <li
            key={user.id}
            className='rounded-md bg-white shadow-md transition-transform hover:rotate-3'
          >
            <a
              href={user.html_url}
              className='flex items-center gap-4 px-8 py-4'
              target='_blank'
              rel='noreferrer'
            >
              <Image
                src={user.avatar_url}
                width={100}
                height={100}
                alt='user image'
                className='h-12 w-12 rounded-full'
              />

              <p className='text-xl text-stone-800'>{user.login}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
