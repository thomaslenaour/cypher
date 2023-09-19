import { Box, Typography } from '@cypher/front/shared/ui';

import { PUBLISH_DURATION_SECONDS } from '../../InsideRoom';

interface InsideRoomLeftSideMainProps {
  status: {
    text: string;
  };
  timer: { timeRemaining: number; enabled: boolean };
}

export function InsideRoomLeftSideMain({
  timer,
  status,
}: InsideRoomLeftSideMainProps) {
  const strokeDasharray = `${
    (((timer.timeRemaining * 100) / PUBLISH_DURATION_SECONDS) * 283) / 100
  }, 283`;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography level="h3" textAlign="center">
        {status.text}
      </Typography>
      {timer.enabled && (
        <Box
          sx={{
            position: 'relative',
            height: '200px',
            width: '200px',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            style={{ transform: 'scaleX(-1)' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              style={{
                fill: 'none',
                stroke: 'none',
              }}
            >
              <circle
                style={{
                  strokeWidth: '5px',
                  stroke: 'none',
                }}
                cx="50"
                cy="50"
                r="45"
              />
              <path
                strokeDasharray={strokeDasharray}
                style={{
                  color: '#dc2626',
                  strokeWidth: '5px',
                  strokeLinecap: 'round',
                  transform: 'rotate(90deg)',
                  transformOrigin: 'center',
                  transition: '1s linear all',
                  stroke: 'currentColor',
                }}
                d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
              ></path>
            </g>
          </svg>
          <Typography
            component="span"
            sx={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              top: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '36px',
            }}
          >
            {timer.timeRemaining}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
