import { Box, Typography } from '@cypher/front/shared/ui';
import { getClient } from '@cypher/front/libs/apollo/server';
import { GetUserProfileDocument } from '@cypher/front/shared/graphql';

interface IUserProfileProps {
  pseudo: string;
}

type UserProfile = {
  id: string;
  bannerUrl?: string | null;
  profileUrl?: string | null;
  pseudo: string;
  punchline?: string | null;
  userId: string;
};

export async function UserProfile({ pseudo }: IUserProfileProps) {
  let profile: UserProfile | null = null;

  try {
    const res = await getClient().query({
      query: GetUserProfileDocument,
      variables: {
        key: 'pseudo',
        value: pseudo,
      },
    });

    console.log(res.data.userProfile);
    profile = res.data.userProfile;
  } catch (error) {
    profile = null;
  }

  return (
    <Box>
      {profile === null ? (
        <Typography>No user found for the pseudo : {pseudo} </Typography>
      ) : (
        <Typography>Welcome page</Typography>
      )}
    </Box>
  );
}
