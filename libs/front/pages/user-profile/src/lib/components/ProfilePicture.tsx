'use client';
import { Box, IconButton, Typography } from '@cypher/front/shared/ui';
import { useState } from 'react';
import { Pencil } from 'lucide-react';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import { DashboardModal } from '@uppy/react';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';

const profilePictureUppy = new Uppy({
  restrictions: {
    maxNumberOfFiles: 1,
    maxFileSize: 2000000,
    allowedFileTypes: ['image/*'],
  },
}).use(Webcam);

const PROFILE_PICTURE_SIZE = {
  sm: 8.125,
  xs: 7,
};

interface ProfilePictureProps {
  pseudo: string;
  profileUrl?: string | null;
  currentUserIsOnHisProfilePage: boolean;
}

export function ProfilePicture({
  pseudo,
  profileUrl,
  currentUserIsOnHisProfilePage,
}: ProfilePictureProps) {
  const [openDashboardModal, setOpenDashboardModal] = useState<boolean>(false);

  return (
    <>
      <Box
        className="profile-picture"
        sx={{
          ...(profileUrl != null
            ? {
                background: `url("${profileUrl}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {
                backgroundColor: 'primary.500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& > span': {
                  color: 'white',
                },
              }),
          height: {
            sm: `${PROFILE_PICTURE_SIZE.sm}rem`,
            xs: `${PROFILE_PICTURE_SIZE.xs}rem`,
          },
          width: {
            sm: `${PROFILE_PICTURE_SIZE.sm}rem`,
            xs: `${PROFILE_PICTURE_SIZE.xs}rem`,
          },
          borderRadius: '6.25rem',
          marginTop: {
            sm: `-${PROFILE_PICTURE_SIZE.sm / 2}rem`,
            xs: `-${PROFILE_PICTURE_SIZE.xs / 2}rem`,
          },
          position: 'relative',
        }}
      >
        {!profileUrl && (
          <Typography level="h1" component="span">
            {pseudo[0].toUpperCase()}
          </Typography>
        )}
        {currentUserIsOnHisProfilePage && (
          <IconButton
            sx={{
              borderRadius: '100px',
              position: 'absolute',
              bottom: 0,
              right: '5px',
              height: '20px',
              width: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            color="neutral"
            variant="soft"
            onClick={() => {
              setOpenDashboardModal(true);
            }}
          >
            <Pencil size={17} />
          </IconButton>
        )}
      </Box>
      {currentUserIsOnHisProfilePage && (
        <DashboardModal
          uppy={profilePictureUppy}
          plugins={['Webcam']}
          open={openDashboardModal}
          onRequestClose={() => {
            setOpenDashboardModal(false);
          }}
          closeModalOnClickOutside={true}
        />
      )}
    </>
  );
}
