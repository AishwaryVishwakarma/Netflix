import React from 'react';

interface SvgProps {
  className?: string;
  color?: string;
  height?: number;
  width?: number;
}

const CheckMarkCircle: React.FC<SvgProps> = ({
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
      data-name='SuccessFill'
      aria-hidden='true'
      fill={color}
      height={height}
      width={width}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM11.7071 15.7071L17.7071 9.70711L16.2929 8.29289L11 13.5858L8.70711 11.2929L7.29289 12.7071L10.2929 15.7071L11 16.4142L11.7071 15.7071Z'
      ></path>
    </svg>
  );
};

export default CheckMarkCircle;
