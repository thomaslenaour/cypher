import { Box, IconButton } from '@cypher/front/shared/ui';
import { Pencil } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Uppy from '@uppy/core';
import { DashboardModal } from '@uppy/react';
import Transloadit from '@uppy/transloadit';
import ImageEditor from '@uppy/image-editor';
import { uppyTranslations } from '../translations/uppy';

// STYLES
import '@uppy/core/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';

interface BannerProps {
  pseudo: string;
  bannerUrl: string | null;
  currentUserIsOnHisProfilePage: boolean;
  handleUpdateBannerUrl: (url: string) => Promise<boolean>;
}
export const Banner = ({
  pseudo,
  bannerUrl,
  currentUserIsOnHisProfilePage,
  handleUpdateBannerUrl,
}: BannerProps) => {
  const [openDashboardModal, setOpenDashboardModal] = useState<boolean>(false);

  const bannerPictureUppy = useMemo(() => {
    return new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        maxFileSize: 10000000,
        allowedFileTypes: ['image/*'],
      },
    })
      .use(Transloadit, {
        assemblyOptions: {
          params: {
            auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_API_KEY },
            template_id:
              process.env.NEXT_PUBLIC_TRANSLOADIT_BANNERS_TEMPLATE_ID,
          },
        },
        waitForEncoding: true,
        locale: { ...uppyTranslations.fr.transloadit },
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
      });
  }, []);

  useEffect(() => {
    bannerPictureUppy.setOptions({
      onBeforeFileAdded: (file) => {
        file.name = `${pseudo}_${new Date().getTime()}`;
        return Boolean(file);
      },
    });

    bannerPictureUppy.on('transloadit:result', (_, result) => {
      handleUpdateBannerUrl(result.ssl_url);
    });
  }, [pseudo, handleUpdateBannerUrl, bannerPictureUppy]);

  return (
    <>
      <Box
        sx={{
          ...(bannerUrl
            ? {
                background: `url("${bannerUrl}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.400',
              }),
          height: {
            sm: '18.75rem',
            xs: '12.5rem',
          },
          position: 'relative',
        }}
      >
        {currentUserIsOnHisProfilePage && (
          <IconButton
            sx={{
              borderRadius: '100px',
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              height: '20px',
              width: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            color="primary"
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
          uppy={bannerPictureUppy}
          plugins={['ImageEditor']}
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
};
