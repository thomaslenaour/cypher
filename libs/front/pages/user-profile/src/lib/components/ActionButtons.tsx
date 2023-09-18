import React from 'react';
import { Button } from '@cypher/front/shared/ui';

interface ActionButtonsProps {
  currentUserIsOnHisProfilePage: boolean;
  currentUserFollowUser: boolean;
  sessionStatus: 'loading' | 'authenticated' | 'unauthenticated';
  handleFollowClick: () => Promise<void>;
  handleOpenUpdateModal: () => void;
}

export const ActionButtons = ({
  currentUserFollowUser,
  currentUserIsOnHisProfilePage,
  sessionStatus,
  handleFollowClick,
  handleOpenUpdateModal,
}: ActionButtonsProps) => {
  if (sessionStatus !== 'authenticated') return;

  return !currentUserIsOnHisProfilePage ? (
    <Button
      disabled={sessionStatus !== 'authenticated'}
      color="primary"
      onClick={handleFollowClick}
    >
      {currentUserFollowUser ? 'Se désabonner' : "S'abonner"}
    </Button>
  ) : (
    <Button
      disabled={sessionStatus !== 'authenticated'}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.400',
      }}
      onClick={handleOpenUpdateModal}
    >
      Modifier mon profil
    </Button>
  );
};
