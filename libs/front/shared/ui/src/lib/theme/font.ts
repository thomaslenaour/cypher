import { Public_Sans } from 'next/font/google';

const NEXT_FONT_PUBLIC_SANS = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const fontFamily = NEXT_FONT_PUBLIC_SANS.style.fontFamily.replace(
  /'/g,
  ''
);
