'use client';

import { useState } from 'react';
import { useChat } from '@livekit/components-react';
import { Send } from 'lucide-react';

import { Box, IconButton, Input, Typography } from '@cypher/front/shared/ui';

export function Chat() {
  const [message, setMessage] = useState('');
  const { send, chatMessages } = useChat();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
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
      }}
    >
      <Typography
        level="h5"
        fontWeight={700}
        sx={{
          borderBottom: '1px #EAEEF6 solid',
          borderTop: '1px #EAEEF6 solid',
          p: 1,
        }}
      >
        Chat
      </Typography>
      <Box sx={{ p: 1, flex: 1, overflowY: 'auto' }}>
        {chatMessages.map((message) => (
          <Box key={message.timestamp}>
            <Typography level="body2">
              <span style={{ fontWeight: 700 }}>
                {message.from?.name || 'Anonymous'} :
              </span>{' '}
              {message.message}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Input
          value={message}
          onChange={handleChange}
          sx={{
            borderRadius: '0px',
            borderTop: '1px #EAEEF6 solid',
            borderLeft: '0px',
            borderRight: '0px',
            borderBottom: '0px',
            py: 1,
            flex: 1,
            outline: 'none',
            ':hover': {
              borderTop: '1px #EAEEF6 solid',
              borderLeft: '0px',
              borderRight: '0px',
              borderBottom: '0px',
            },
            ':focus': {
              outline: 'none',
            },
          }}
          placeholder="Ecrivez votre message ici"
        />
        <IconButton
          variant="solid"
          sx={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: '16px',
          }}
          onClick={handleSend}
        >
          <Send size="20px" />
        </IconButton>
      </Box>
    </Box>
  );
}
