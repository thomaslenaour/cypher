'use client';

import { useChat } from '@livekit/components-react';
import { useState } from 'react';
import { Send } from 'lucide-react';
import Link from 'next/link';

import {
  Box,
  Button,
  IconButton,
  Input,
  Typography,
} from '@cypher/front/shared/ui';

interface InsideRoomRightProps {
  authenticated: boolean;
}

export function InsideRoomRightSide({ authenticated }: InsideRoomRightProps) {
  const [message, setMessage] = useState('');
  const { chatMessages, send } = useChat();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (!authenticated) return;

    if (message) {
      await send?.(message);
    }
    setMessage('');
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography
          level="h3"
          fontWeight={700}
          textAlign="center"
          p={1}
          sx={{
            borderBottom: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'neutral.700' : 'neutral.200',
          }}
        >
          Chat en direct
        </Typography>
      </Box>
      <Box
        sx={{
          p: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          overflowY: 'auto',
        }}
      >
        {chatMessages.map((message) => {
          const userMetadata = message.from?.metadata
            ? JSON.parse(message.from?.metadata)
            : null;
          const color = userMetadata?.color || 'black';

          return (
            <Box key={message.timestamp}>
              <Typography level="body-sm" sx={{ lineHeight: '1rem' }}>
                <span style={{ fontWeight: 700, color }}>
                  {message.from?.name || 'Anonymous'}
                </span>
                &nbsp;&nbsp;
                {message.message}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          p: 1,
        }}
      >
        {authenticated ? (
          <>
            <Input
              sx={{ width: '100%', py: 1 }}
              value={message}
              placeholder="Tapez votre message ici..."
              onChange={handleChange}
              onKeyDown={(e) => {
                e.key === 'Enter' && handleSend();
              }}
            />
            <IconButton color="primary" variant="solid" onClick={handleSend}>
              <Send size="20px" />
            </IconButton>
          </>
        ) : (
          <Link href="/login" style={{ width: '100%' }}>
            <Button fullWidth>Connectez-vous pour chatter</Button>
          </Link>
        )}
      </Box>
    </Box>
  );
}
