import { Providers } from '@cypher/front/core';

export const metadata = {
  title: 'Cypher App',
  description: 'Welcome to Cypher App!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
