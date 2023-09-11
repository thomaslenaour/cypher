import { getProviders } from '@cypher/front/libs/auth/server';

import RegisterPageContent from './RegisterPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "S'inscrire",
  description: 'Inscrivez-vous sur Cypher',
};

export default async function RegisterPage() {
  const providers = await getProviders();
  const formattedProviders = Object.values(providers || {})
    .map((provider) => ({
      id: provider.id,
      name: provider.name,
    }))
    .filter((provider) => provider.id !== 'email');

  return <RegisterPageContent providers={formattedProviders} />;
}
