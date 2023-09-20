import { Box, IconButton } from '@cypher/front/shared/ui';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

// Uppy
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';
import { DashboardModal } from '@uppy/react';

const bannerPictureUppy = new Uppy({
  restrictions: {
    maxNumberOfFiles: 1,
    maxFileSize: 4000000,
    allowedFileTypes: ['image/*'],
  },
});

interface BannerProps {
  bannerUrl: string | null;
  currentUserIsOnHisProfilePage: boolean;
}
export const Banner = ({
  bannerUrl,
  currentUserIsOnHisProfilePage,
}: BannerProps) => {
  const [openDashboardModal, setOpenDashboardModal] = useState<boolean>(false);

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
              bottom: '5px',
              right: '5px',
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
};
