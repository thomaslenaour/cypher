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
  pseudo: string;
  name: string;
  punchline: string;
  handleClose: () => void;
  handleSubmit: (data: UpdateProfileInput) => Promise<{
    success: boolean;
    errorCode?: string;
  }>;
}

export const UpdateProfileModal = ({
  open,
  pseudo,
  name,
  punchline,
  handleClose,
  handleSubmit,
}: UpdateProfileModalProps) => (
  <Modal open={open} onClose={handleClose}>
    <ModalDialog>
      <Typography p={0} m={0} level="h3">
        Mettre à jour mes informations
      </Typography>
      <Divider />
      <UpdateProfileForm
        {...{ pseudo, name, punchline, handleSubmit, handleClose }}
      />
    </ModalDialog>
  </Modal>
);
