import { Footer, Header } from '@cypher/front/components/common/server';
import { Container } from '@cypher/front/shared/ui';
import { AuthenticationCard } from '@cypher/front/components/authentication/server';

interface RegisterPageContentProps {
  providers: {
    id: string;
    name: string;
  }[];
}

export default function RegisterPageContent({
  providers,
}: RegisterPageContentProps) {
  const authenticationCardProps = {
    title: 'Inscription',
    description:
      'Bienvenue sur Cypher. Inscris-toi afin de rejoindre une communauté de passionnés autour de la musique urbaine.',
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
