import React from 'react';

const CustomShapeDivider: React.FC = () => {
  return (
    <div className="w-full overflow-hidden leading-[0]">
      <svg
        className="relative block w-full h-[300px] md:h-[400px] lg:h-[500px]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#009DFF" />
            <stop offset="90%" stopColor="#7ECDFD" />
          </linearGradient>
        </defs>
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          className="fill-[url(#shapeGradient)]"
          transform="scale(1, -1) translate(0, -120)"
        />
        <path // Re-using the user's path mostly but applying the gradient. 
          // Actually, let's stick to the user's original path shape if possible, but flipped?
          // The previous code had `rotate-180`.
          d="M0,0V7.23C-180,85.52,68.63,112.77,750,112.7S1200,65.52,1200,7.23V0Z"
          fill="url(#shapeGradient)"
          transform="rotate(180 600 60)"
        />
      </svg>
    </div>
  );
};

export default CustomShapeDivider;
