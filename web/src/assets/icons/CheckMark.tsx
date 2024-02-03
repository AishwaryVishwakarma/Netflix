import React from 'react';

interface SvgProps {
  className?: string;
  color?: string;
  height?: number;
  width?: number;
}

const CheckMark: React.FC<SvgProps> = ({
  className,
  color = '#e50914',
  height = 24,
  width = 24,
}) => {
  return (
    <svg
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill={color}
      height={height}
      width={width}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.68239 19.7312L23.6824 5.73115L22.3178 4.26904L8.02404 17.6098L2.70718 12.293L1.29297 13.7072L7.29297 19.7072C7.67401 20.0882 8.28845 20.0988 8.68239 19.7312Z'
      ></path>
    </svg>
  );
};

export default CheckMark;
