import type { CodegenConfig } from '@graphql-codegen/cli';

const GRAPHQL_API_URL = 'http://localhost:3001/graphql';
const config: CodegenConfig = {
  overwrite: true,
  schema: GRAPHQL_API_URL,
  documents: ['./src/lib/**/*.graphql'],
  generates: {
    './src/lib/generated/': {
      preset: 'client',
    },
  },
};

export default config;
