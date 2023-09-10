import { Box } from '@cypher/front/shared/ui';

export function SvgBackground() {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'block' },
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 800 450"
        opacity="0.27"
        preserveAspectRatio="true"
      >
        <defs>
          <filter
            id="bbblurry-filter"
            x="-100%"
            y="-100%"
            width="400%"
            height="400%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feGaussianBlur
              stdDeviation="41"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="SourceGraphic"
              edgeMode="none"
              result="blur"
            ></feGaussianBlur>
          </filter>
        </defs>
        <g filter="url(#bbblurry-filter)">
          <ellipse
            rx="83"
            ry="101.5"
            cx="237.8501032049005"
            cy="244.3676286177202"
            fill="#f87171"
          ></ellipse>
          <ellipse
            rx="83"
            ry="101.5"
            cx="556.0853770862925"
            cy="250.07254444469106"
            fill="#f87171"
          ></ellipse>
          <ellipse
            rx="83"
            ry="101.5"
            cx="395.8139371004971"
            cy="185.16959450461647"
            fill="#f87171"
          ></ellipse>
        </g>
      </svg>
    </Box>
  );
}
