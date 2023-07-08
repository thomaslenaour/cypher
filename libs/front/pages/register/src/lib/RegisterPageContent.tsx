import { Header } from '@cypher/front/components/common/server';
import { Container } from '@cypher/front/shared/ui';
import { AuthenticationCard } from '@cypher/front/components/authentication/server';
import { useServerTranslations } from '@cypher/front/libs/i18n/server';

interface RegisterPageContentProps {
  providers: {
    id: string;
    name: string;
  }[];
}

export default function RegisterPageContent({
  providers,
}: RegisterPageContentProps) {
  const t = useServerTranslations('RegisterPage');
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
          pt: 4,
        }}
      >
        <AuthenticationCard
          providers={providers}
          translations={authenticationCardTranslations}
        />
      </Container>
    </>
  );
}
