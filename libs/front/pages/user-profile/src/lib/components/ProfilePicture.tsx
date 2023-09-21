'use client';
import { Box, IconButton, Typography } from '@cypher/front/shared/ui';
import { useEffect, useMemo, useState } from 'react';
import { Pencil } from 'lucide-react';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import { DashboardModal } from '@uppy/react';
import Transloadit from '@uppy/transloadit';
import ImageEditor from '@uppy/image-editor';
import { uppyTranslations } from '../translations/uppy';

// STYLES
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';

const PROFILE_PICTURE_SIZE = {
  sm: 8.125,
  xs: 7,
};

interface ProfilePictureProps {
  pseudo: string;
  profileUrl: string | null;
  currentUserIsOnHisProfilePage: boolean;
  handleUpdateProfileUrl: (url: string) => Promise<boolean>;
}

export function ProfilePicture({
  pseudo,
  profileUrl,
  currentUserIsOnHisProfilePage,
  handleUpdateProfileUrl,
}: ProfilePictureProps) {
  const [openDashboardModal, setOpenDashboardModal] = useState<boolean>(false);

  const profilePictureUppy = useMemo(() => {
    return new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        maxFileSize: 5000000,
        allowedFileTypes: ['image/*'],
      },
    })
      .use(Webcam, {
        modes: ['picture'],
      })
      .use(ImageEditor, {
        quality: 0.8,
        cropperOptions: {
          viewMode: 1,
          background: false,
          autoCropArea: 1,
          responsive: true,
          croppedCanvasOptions: {},
        },
        locale: {
          ...uppyTranslations.fr.imageEditor,
        },
      })
      .use(Transloadit, {
        assemblyOptions: {
          params: {
            auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_API_KEY },
            template_id:
              process.env.NEXT_PUBLIC_TRANSLOADIT_PROFILES_TEMPLATE_ID,
          },
        },
        waitForEncoding: true,
        locale: { ...uppyTranslations.fr.transloadit },
      });
  }, []);

  useEffect(() => {
    profilePictureUppy.setOptions({
      onBeforeFileAdded: (file) => {
        file.name = `${pseudo}_${new Date().getTime()}`;
        return Boolean(file);
      },
    });

    profilePictureUppy.on('transloadit:result', (_, result) => {
      handleUpdateProfileUrl(result.ssl_url);
    });
  }, [pseudo, handleUpdateProfileUrl, profilePictureUppy]);

  return (
    <>
      <Box
        className="profile-picture"
        sx={{
          ...(profileUrl != null
            ? {
                background: `url(${profileUrl})`,
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
          plugins={['Webcam', 'ImageEditor']}
          open={openDashboardModal}
          onRequestClose={() => {
            setOpenDashboardModal(false);
          }}
          closeModalOnClickOutside={true}
          autoOpenFileEditor={true}
          locale={{
            strings: {
              ...uppyTranslations.fr.statusBar.strings,
              ...uppyTranslations.fr.dashboard.strings,
            },
          }}
        />
      )}
    </>
  );
}
