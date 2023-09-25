'use client';

import { Box, Stack, Typography } from '@cypher/front/shared/ui';
import { ReactNode, useState } from 'react';

interface HeaderCardProps {
  icon: ReactNode;
  title: string;
  value: number | string;
  listItems?: string[];
}

const BORDER_WIDTH = 1;

export function HeaderCard({ icon, title, value, listItems }: HeaderCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Box
      sx={{
        border: `${BORDER_WIDTH}px solid`,
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'neutral.700' : 'neutral.200',
        borderRadius: '1px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        position: 'relative',
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {listItems && showTooltip && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: '-1px',
            right: '0',
            width: `calc(100% + ${BORDER_WIDTH * 2}px)`,
            backgroundColor: 'background.body',
            border: `${BORDER_WIDTH}px solid`,
            p: 2,
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'neutral.700' : 'neutral.200',
          }}
        >
          {listItems?.length === 0 && (
            <Typography level="body-xs" textAlign="center">
              Aucun artiste en attente
            </Typography>
          )}
          {listItems?.length > 0 &&
            listItems.map((item, i) => (
              <Typography
                key={`queue-item-${i}`}
                level="body-xs"
                sx={{ wordBreak: 'break-all' }}
              >
                {i + 1}. {item}
              </Typography>
            ))}
        </Box>
      )}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Box>{icon}</Box>
        <Typography
          level="title-lg"
          textAlign="center"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          {title}
        </Typography>
      </Stack>
      <Typography
        mt={1}
        level="h3"
        textAlign="center"
        color="primary"
        sx={{
          maxWidth: { xs: '126px', md: '220px' },
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
