import { Box, CircularProgress, Typography } from '@cypher/front/shared/ui';

export function RoomLoader() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
      <Typography textAlign="center" sx={{ mt: 1 }}>
        Connexion en cours...
      </Typography>
    </Box>
  );
}
