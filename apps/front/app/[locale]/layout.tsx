import { notFound } from 'next/navigation';

import { I18nProvider, useServerLocale } from '@cypher/front/libs/i18n/server';
import { Providers } from '@cypher/front/core';

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

export default function RootLayout({ children, params }: RootLayoutProps) {
  const locale = useServerLocale();

  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        {/* @ts-expect-error Server Component */}
        <I18nProvider locale={locale}>
          <Providers>{children}</Providers>
        </I18nProvider>
      </body>
    </html>
  );
}