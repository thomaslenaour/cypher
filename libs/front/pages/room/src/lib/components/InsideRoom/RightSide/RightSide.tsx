'use client';

import { useChat } from '@livekit/components-react';
import { useMemo, useState } from 'react';
import { Send, X } from 'lucide-react';
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
  closeChat: () => void;
}

export function InsideRoomRightSide({
  authenticated,
  closeChat,
}: InsideRoomRightProps) {
  const [message, setMessage] = useState('');
  const { chatMessages, send } = useChat();
  const messages = useMemo(() => {
    return [...chatMessages].reverse();
  }, [chatMessages]);

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'space-between', md: 'center' },
          alignItems: 'center',
          p: 1,
          borderBottom: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'neutral.700' : 'neutral.200',
        }}
      >
        <Typography level="h3" fontWeight={700} textAlign="center">
          Chat en direct
        </Typography>
        <IconButton
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
          onClick={closeChat}
        >
          <X size="24px" />
        </IconButton>
      </Box>
      <Box
        sx={{
          p: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column-reverse',
          gap: 0.5,
          overflowY: 'auto',
        }}
      >
        {messages.map((message) => {
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
                <span style={{ wordBreak: 'break-all' }}>
                  {message.message}
                </span>
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
              placeholder="Ecris ton message ici..."
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
            <Button fullWidth>Connecte-toi pour chatter</Button>
          </Link>
        )}
      </Box>
    </Box>
  );
}
