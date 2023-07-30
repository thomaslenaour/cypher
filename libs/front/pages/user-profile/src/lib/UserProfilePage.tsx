import { Header } from '@cypher/front/components/common/server';
import { Box, Typography } from '@cypher/front/shared/ui';

export async function UserProfilePage() {
  return (
    <>
      <Header />
      <Box>
        <Typography>Hello User Profile Page</Typography>
      </Box>
    </>
  );
}
