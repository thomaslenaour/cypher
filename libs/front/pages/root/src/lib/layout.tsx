import { notFound } from 'next/navigation';

import { I18nProvider, useServerLocale } from '@cypher/front/libs/i18n/server';
import { Providers } from '@cypher/front/core';
import { Footer } from '@cypher/front/components/common/server';
import { authOptions, getServerSession } from '@cypher/front/libs/auth/server';

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export const metadata = {
  title: 'Cypher App',
  description: 'Welcome to Cypher App!',
};

export async function RootLayout({ children, params }: RootLayoutProps) {
  const locale = useServerLocale();

  if (params.locale !== locale) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const token = session?.accessToken || '';

  return (
    <html lang={locale}>
      <body>
        <I18nProvider locale={locale}>
          <Providers authToken={token}>
            {children}
            <Footer />
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}

export default RootLayout;
