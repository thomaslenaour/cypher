import React from 'react';
import {
  Divider,
  Modal,
  ModalDialog,
  Typography,
} from '@cypher/front/shared/ui';
import { UpdateProfileForm, UpdateProfileInput } from './Form';

interface UpdateProfileModalProps {
  open: boolean;
  name: string;
  punchline: string;
  handleClose: () => void;
  handleSubmit: (data: UpdateProfileInput) => Promise<boolean>;
}

export const UpdateProfileModal = ({
  open,
  name,
  punchline,
  handleClose,
  handleSubmit,
}: UpdateProfileModalProps) => (
  <Modal open={open} onClose={handleClose}>
    <ModalDialog sx={{ minWidth: '34.375rem' }}>
      <Typography p={0} m={0} level="h3">
        Mettre à jour mes informations
      </Typography>
      <Divider />
      <UpdateProfileForm {...{ name, punchline, handleSubmit, handleClose }} />
    </ModalDialog>
  </Modal>
);
