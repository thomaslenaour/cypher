//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const withNextIntl = require('next-intl/plugin')(
  '../../libs/front/libs/i18n/src/lib/i18n.ts'
);

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  experimental: {
    outputFileTracingIgnores: [
      '**/node_modules/@swc/core-linux-x64-gnu',
      '**/node_modules/@swc/core-linux-x64-musl',
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://api.cypherapp.co',
    NEXT_PUBLIC_LIVEKIT_SERVER_URL: 'wss://cypher.livekit.cloud',
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withNextIntl,
];

module.exports = composePlugins(...plugins)(nextConfig);
