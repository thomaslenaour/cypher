import { Providers } from '@cypher/front/core';
import { authOptions, getServerSession } from '@cypher/front/libs/auth/server';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: 'Cypher App',
  description: 'Welcome to Cypher App!',
};

export async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken || '';

  return (
    <html lang="fr">
      <body>
        <Providers authToken={token}>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
