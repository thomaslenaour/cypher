import avatarDefault from '../../avatar-default.png';

import {
  Avatar,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from '@cypher/front/shared/ui';

interface QueueListProps {
  participants: {
    sid: string;
    name: string;
    inQueueAt?: number;
  }[];
}

export function QueueList({ participants }: QueueListProps) {
  return (
    <List>
      {participants.map((participant) => (
        <ListItem key={participant.sid}>
          <ListItemDecorator>
            <Avatar src={avatarDefault.src} />
          </ListItemDecorator>
          <ListItemContent sx={{ ml: 1 }}>
            <Typography level="body2" noWrap>
              {participant.name}
            </Typography>
            {participant?.inQueueAt && (
              <Typography level="body3" noWrap>
                Joined at {new Date(participant.inQueueAt).toLocaleTimeString()}
              </Typography>
            )}
          </ListItemContent>
        </ListItem>
      ))}
    </List>
  );
}
