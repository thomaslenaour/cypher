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
  api: {
    ['UNIQUE_PSEUDO' as string]: 'Ce pseudo est déjà utilisé.',
  },
  pseudo:
    "Ton pseudo doit faire entre 3 et 20 caractères et ne doit pas contenir d'espace.",
  name: "Ton nom d'utilisateur doit faire entre 3 et 20 caractères.",
  punchline:
    'Ton inspiration est remarquable mais la punchline est limitée à 250 caractères.',
  root: "Une erreur s'est produite ... Veuillez vérifier vos information ou réessayer plus tard.",
};

const UpdateProfileSchema = z.object({
  pseudo: z
    .string()
    .min(3, { message: UPDATE_PROFILE_ERRORS.pseudo })
    .max(30, { message: UPDATE_PROFILE_ERRORS.pseudo })
    .refine((s) => !s.includes(' '), UPDATE_PROFILE_ERRORS.pseudo),
  name: z
    .string()
    .min(3, { message: UPDATE_PROFILE_ERRORS.name })
    .max(30, { message: UPDATE_PROFILE_ERRORS.name }),
  punchline: z.string().max(250, { message: UPDATE_PROFILE_ERRORS.punchline }),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

interface UpdateProfileFormProps {
  pseudo: string;
  name: string;
  punchline: string;
  handleSubmit: (data: UpdateProfileInput) => Promise<{
    success: boolean;
    errorCode?: string;
  }>;
  handleClose: () => void;
}

export const UpdateProfileForm = ({
  pseudo,
  name,
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
    const res = await handleSubmit(data);
    if (!res.success && res.errorCode) {
      if (UPDATE_PROFILE_ERRORS.api[res.errorCode]) {
        setError('root', {
          message: UPDATE_PROFILE_ERRORS.api[res.errorCode],
        });
      } else {
        setError('root', {
          message: UPDATE_PROFILE_ERRORS.root,
        });
      }
    } else handleClose();
  };

  return (
    <form
      onSubmit={handleSubmitForm(onSubmit)}
      style={{ marginTop: theme.spacing(2) }}
    >
      <Stack gap={2}>
        <Controller
          name="pseudo"
          control={control}
          defaultValue={pseudo}
          render={({ field }) => (
            <Box>
              <FormLabel sx={{ mb: 0.5 }}>Pseudo</FormLabel>
              <Input {...field} />
              {errors.pseudo?.message && (
                <Typography level="body-sm" color="danger">
                  {errors.pseudo?.message}
                </Typography>
              )}
            </Box>
          )}
        />
        <Controller
          name="name"
          control={control}
          defaultValue={name}
          render={({ field }) => (
            <Box>
              <FormLabel sx={{ mb: 0.5 }}>Nom d'utilisateur</FormLabel>
              <Input {...field} />
              {errors.name?.message && (
                <Typography level="body-sm" color="danger">
                  {errors.name?.message}
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
              <FormLabel sx={{ mb: 0.5 }}>Ta meilleure punchline</FormLabel>
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
