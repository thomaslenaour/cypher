import { getProviders } from '@cypher/front/libs/auth/server';
import { LoginPageContent } from './LoginPageContent';

export default async function LoginPage() {
  const providers = await getProviders();
  const formattedProviders = Object.values(providers || {})
    .map((provider) => ({
      id: provider.id,
      name: provider.name,
    }))
    .filter((provider) => provider.id !== 'email');

  return <LoginPageContent providers={formattedProviders} />;
}
