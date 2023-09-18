import { GoogleAnalytics } from '@cypher/front/components/common/server';
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
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <GoogleAnalytics id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        )}
        <Providers authToken={token}>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
