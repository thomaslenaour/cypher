import { extendTheme } from '@mui/joy';
import { fontFamily } from './font';

export const theme = extendTheme({
  fontFamily: {
    body: `${fontFamily}, sans-serif`,
    display: `${fontFamily}, sans-serif`,
    fallback: 'Arial, sans-serif',
  },
});
