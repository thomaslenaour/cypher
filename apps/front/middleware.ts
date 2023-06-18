import { createMiddleware } from '@cypher/front/libs/i18n/server';

export default createMiddleware({
  locales: ['fr'],
  defaultLocale: 'fr',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
