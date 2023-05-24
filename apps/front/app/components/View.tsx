'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function View() {
  const { status, data } = useSession();

  console.log('data', data);

  return (
    <div>
      <button
        onClick={() => (status === 'unauthenticated' ? signIn() : signOut())}
      >
        {status === 'unauthenticated' ? 'Sign in' : 'Sign out'}
      </button>
    </div>
  );
}
