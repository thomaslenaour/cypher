import { Container, Divider, Stack, Typography } from '@cypher/front/shared/ui';

export function Footer() {
  return (
    <Container component="footer" sx={{ py: 5 }}>
      <Divider sx={{ mb: 5 }} />
      <Stack direction="column" alignItems="center" gap={1}>
        <Typography level="h3" fontStyle="italic" textTransform="uppercase">
          Cypher
        </Typography>
        <Typography level="body-sm">&copy; 2023 Cypher</Typography>
      </Stack>
    </Container>
  );
}
