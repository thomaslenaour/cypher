import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import jwt from 'jsonwebtoken';

import {
  API_ACCESS_TOKEN_EXPIRES_IN_MILLISECONDS,
  API_ACCESS_TOKEN_EXPIRES_IN_MINUTES,
  API_ACCESS_TOKEN_REVALIDATE_INTERVAL_IN_MILLISECONDS,
  ApiJwtPayload,
  FRONT_ACCESS_TOKEN_EXPIRES_IN_SECONDS,
} from '@cypher/shared/config/authentication';

import { prismaClient } from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: FRONT_ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  },
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken;

      if (token?.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token, account }) {
      const generateNewAccessToken =
        token?.accessTokenExpires <=
        Date.now() + API_ACCESS_TOKEN_REVALIDATE_INTERVAL_IN_MILLISECONDS;

      if (account || generateNewAccessToken) {
        const jwtPayload: Omit<ApiJwtPayload, 'iat' | 'exp'> = {
          sub: token.sub as string,
        };
        token.accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
          expiresIn: `${API_ACCESS_TOKEN_EXPIRES_IN_MINUTES}m`,
        });
        token.accessTokenExpires =
          Date.now() + API_ACCESS_TOKEN_EXPIRES_IN_MILLISECONDS;
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
