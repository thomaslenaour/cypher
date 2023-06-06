// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    accessTokenExpires: number;
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}
