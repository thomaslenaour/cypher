import { Box } from '@cypher/front/shared/ui';
import { Insight } from './Insight';
import { IUser } from '../interfaces';
import { FollowersModal } from './FollowersModal';
import { useState } from 'react';

interface InsightsProps {
  contributions: number;
  followers: IUser[];
  followings: IUser[];
}

export const Insights = ({
  contributions,
  followers,
  followings,
}: InsightsProps) => {
  const contributionsLabel = `Participation${contributions > 1 ? 's' : ''}`;
  const followersLabel = `Abonné${followers.length > 1 ? 's' : ''}`;
  const followingsLabel = `Abonnement${followings.length > 1 ? 's' : ''}`;

  const [openFollowersModal, setOpenFollowersModal] = useState<boolean>(false);
  const [openFollowingsModal, setOpenFollowingsModal] =
    useState<boolean>(false);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          justifyContent: {
            xs: 'flex-start',
            md: 'flex-end',
          },
          gap: {
            xs: 0.2,
            sm: 2,
          },
        }}
      >
        <Insight label={contributionsLabel} value={contributions} />
        <Insight
          label={followersLabel}
          value={followers.length}
          onClick={() => {
            setOpenFollowersModal(true);
          }}
        />
        <Insight
          label={followingsLabel}
          value={followings.length}
          onClick={() => {
            setOpenFollowingsModal(true);
          }}
        />
      </Box>
      <FollowersModal
        users={followers}
        isOpen={openFollowersModal}
        title={followersLabel}
        onClose={() => {
          setOpenFollowersModal(false);
        }}
      />
      <FollowersModal
        users={followings}
        isOpen={openFollowingsModal}
        title={followingsLabel}
        onClose={() => {
          setOpenFollowingsModal(false);
        }}
      />
    </>
  );
};
