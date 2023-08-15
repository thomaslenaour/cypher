import { useChat } from '@livekit/components-react';

import { Box, Typography } from '@cypher/front/shared/ui';

import { Queue } from './Queue/Queue';

export function InsideRoomRightSide() {
  const { send, chatMessages } = useChat();

  const handleClick = async () => {
    await send?.('message test');
  };

  return (
    <Box
      sx={{
        p: 1,
        height: '100%',
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Queue />
      <Box>
        <Typography level="h4" fontWeight={700}>
          Chat
        </Typography>
        <button onClick={handleClick}>click me</button>
        <div>
          {chatMessages.map((message) => (
            <div key={message.timestamp}>
              <Typography level="body2">{message.message}</Typography>
            </div>
          ))}
        </div>
      </Box>
    </Box>
  );
}
