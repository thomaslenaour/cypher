import { Providers } from '@cypher/front/core';
import { authOptions, getServerSession } from '@cypher/front/libs/auth/server';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    template: '%s | Cypher',
    default: 'Cypher | Exprime ta créativité',
  },
  description: 'Bienvenue sur Cypher!',
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
