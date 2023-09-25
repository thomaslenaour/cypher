import { useQuery } from '@apollo/client';
import { IUser } from '../interfaces';
import { GetUserProfilesDocument } from '@cypher/front/shared/graphql';
import {
  Avatar,
  Box,
  Divider,
  Modal,
  ModalDialog,
  Stack,
  Typography,
} from '@cypher/front/shared/ui';
import Link from 'next/link';

interface FollowersModalProps {
  users: IUser[];
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

export const FollowersModal = ({
  users,
  isOpen,
  title,
  onClose,
}: FollowersModalProps) => {
  const { data } = useQuery(GetUserProfilesDocument, {
    variables: {
      key: 'userId',
      values: users.map((u) => u.id),
    },
  });

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Typography textAlign={'center'} fontWeight={600} level="h4">
          {title}
        </Typography>
        <Divider />
        <Stack gap={2}>
          {data?.userProfiles &&
            data.userProfiles.map((profile) => {
              return (
                <Box key={profile.id}>
                  <Link href={`/users/${profile.pseudo}`}>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                      {profile.profileUrl ? (
                        <Avatar src={profile.profileUrl} size={'md'} />
                      ) : (
                        <Box
                          sx={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '40px',
                            backgroundColor: 'primary.500',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography
                            sx={{ textTransform: 'uppercase', color: 'white' }}
                            fontWeight={600}
                          >
                            {profile.pseudo[0]}
                          </Typography>
                        </Box>
                      )}
                      <Typography fontWeight={600}>
                        {profile.name ?? profile.pseudo}
                      </Typography>
                    </Stack>
                  </Link>
                </Box>
              );
            })}
        </Stack>
      </ModalDialog>
    </Modal>
  );
};
