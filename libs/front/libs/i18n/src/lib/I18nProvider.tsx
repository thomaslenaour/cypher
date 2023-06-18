import { NextIntlClientProvider } from 'next-intl';

interface I18nProviderProps {
  locale: string;
  children: React.ReactNode;
}

export async function I18nProvider({ locale, children }: I18nProviderProps) {
  let messages;
  try {
    messages = (await import(`./messages/${locale}.json`)).default;
  } catch (error) {
    throw new Error(`No messages found for locale ${locale}`);
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

export default I18nProvider;
