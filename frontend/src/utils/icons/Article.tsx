import React from 'react';

interface SvgProps {
  className?: string;
  color?: string;
  height?: number;
  width?: number;
}

const Article: React.FC<SvgProps> = ({
  className,
  color = '#050505',
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
      <rect x='8' y='7' width='8' height='2' fill='#050505'></rect>
      <rect x='8' y='11' width='5' height='2' fill='#050505'></rect>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18 4H6V20H18V4ZM4 2V22H20V2H4Z'
        fill='#050505'
      ></path>
    </svg>
  );
};

export default Article;
