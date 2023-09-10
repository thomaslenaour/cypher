import { AuthenticationCard } from '@cypher/front/components/authentication/server';
import { Footer, Header } from '@cypher/front/components/common/server';
import { useServerTranslations } from '@cypher/front/libs/i18n/server';
import { Container } from '@cypher/front/shared/ui';

interface LoginPageContentProps {
  providers: {
    id: string;
    name: string;
  }[];
}

export function LoginPageContent({ providers }: LoginPageContentProps) {
  const t = useServerTranslations('LoginPage');
  const authenticationCardTranslations = {
    title: t('title'),
    description: t('description'),
    dividerText: t('divider'),
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
          translations={authenticationCardTranslations}
        />
      </Container>
      <Footer />
    </>
  );
}
