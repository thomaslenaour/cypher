import { Box, Container, Stack, Typography } from '@cypher/front/shared/ui';

export function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, backgroundColor: 'common.white' }}>
      <Container>
        <Stack direction="column" alignItems="center" gap={1}>
          <Typography
            level="h3"
            fontWeight={800}
            fontStyle="italic"
            textTransform="uppercase"
          >
            Cypher
          </Typography>
          <Typography level="body-sm">&copy; 2023 Cypher</Typography>
        </Stack>
      </Container>
    </Box>
  );
}
