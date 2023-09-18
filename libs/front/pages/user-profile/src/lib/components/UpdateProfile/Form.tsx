import React from 'react';
import {
  Button,
  Typography,
  Input,
  Textarea,
  FormLabel,
  Stack,
  Box,
  theme,
} from '@cypher/front/shared/ui';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const UPDATE_PROFILE_ERRORS = {
  userName: "Ton nom d'utilisateur doit faire entre 3 et 20 caractères.",
  punchline:
    'Ton inspiration est remarquable mais la punchline est limitée à 250 caractères.',
  root: "Une erreur s'est produite ... Veuillez vérifier vos information ou réessayer plus tard.",
};

const UpdateProfileSchema = z.object({
  userName: z
    .string()
    .min(3, { message: UPDATE_PROFILE_ERRORS.userName })
    .max(30, { message: UPDATE_PROFILE_ERRORS.userName }),
  punchline: z.string().max(250, { message: UPDATE_PROFILE_ERRORS.punchline }),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

interface UpdateProfileFormProps {
  userName: string;
  punchline: string;
  handleSubmit: (data: UpdateProfileInput) => Promise<boolean>;
  handleClose: () => void;
}

export const UpdateProfileForm = ({
  userName,
  punchline,
  handleSubmit,
  handleClose,
}: UpdateProfileFormProps) => {
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    setError,
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(UpdateProfileSchema),
  });

  const onSubmit = async (data: UpdateProfileInput) => {
    const resIsSuccess = await handleSubmit(data);
    if (!resIsSuccess)
      setError('root', {
        message: UPDATE_PROFILE_ERRORS.root,
      });
    else handleClose();
  };

  return (
    <form
      onSubmit={handleSubmitForm(onSubmit)}
      style={{ marginTop: theme.spacing(2) }}
    >
      <Stack gap={2}>
        <Controller
          name="userName"
          control={control}
          defaultValue={userName}
          render={({ field }) => (
            <Box>
              <FormLabel sx={{ marginBottom: 0.5 }}>
                Nom d'utilisateur
              </FormLabel>
              <Input {...field} />
              {errors.userName?.message && (
                <Typography level="body-sm" color="danger">
                  {errors.userName?.message}
                </Typography>
              )}
            </Box>
          )}
        />
        <Controller
          name="punchline"
          control={control}
          defaultValue={punchline}
          render={({ field }) => (
            <Box>
              <FormLabel sx={{ marginBottom: 0.5 }}>
                Ta meilleure punchline
              </FormLabel>
              <Textarea minRows={2} {...field} />
              {errors.punchline?.message && (
                <Typography level="body-sm" color="danger">
                  {errors.punchline?.message}
                </Typography>
              )}
            </Box>
          )}
        />
        <Button fullWidth type="submit" color="neutral" variant="outlined">
          Enregistrer
        </Button>
        {errors.root?.message && (
          <Typography level="body-sm" color="danger">
            {errors.root?.message}
          </Typography>
        )}
      </Stack>
    </form>
  );
};
