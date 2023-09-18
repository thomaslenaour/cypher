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
  userName: string;
  punchline: string;
  handleClose: () => void;
  handleSubmit: (data: UpdateProfileInput) => Promise<void>;
}

export const UpdateProfileModal = ({
  open,
  userName,
  punchline,
  handleClose,
  handleSubmit,
}: UpdateProfileModalProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog>
        <Typography p={0} m={0} level="h3">
          Mettre à jour mes informations
        </Typography>
        <Divider />
        <UpdateProfileForm {...{ userName, punchline, handleSubmit }} />
      </ModalDialog>
    </Modal>
  );
};
