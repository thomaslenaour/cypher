import { AuthenticationCard } from '@cypher/front/components/authentication/server';
import { Footer, Header } from '@cypher/front/components/common/server';
import { Container } from '@cypher/front/shared/ui';

interface LoginPageContentProps {
  providers: {
    id: string;
    name: string;
  }[];
}

export function LoginPageContent({ providers }: LoginPageContentProps) {
  const authenticationCardProps = {
    title: 'Connexion',
    description:
      'Bienvenue sur Cypher. Connectez-vous pour accéder à votre compte.',
    dividerText: 'ou',
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          py: 5,
        }}
      >
        <AuthenticationCard
          providers={providers}
          {...authenticationCardProps}
        />
      </Container>
      <Footer />
    </>
  );
}
