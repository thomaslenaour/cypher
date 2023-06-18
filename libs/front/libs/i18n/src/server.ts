// Use this file to export React server components
export {
  useTranslations as useServerTranslations,
  useLocale as useServerLocale,
} from 'next-intl';
export { default as createMiddleware } from 'next-intl/middleware';
export * from './lib/I18nProvider';
