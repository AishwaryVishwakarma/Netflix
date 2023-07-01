import React from 'react';
import Loader from '../loader/loader';
import styles from './styles.module.scss';

interface ButtonProps {
  text?: string;
  submitFunction?: () => Promise<void>;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text = 'Next',
  submitFunction,
  type = 'button',
  className,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onClickHandler = () => {
    setIsLoading(true);

    submitFunction && submitFunction();

    setIsLoading(false);
  };
  return (
    <button
      role='button'
      type={type}
      className={`${styles.button} ${isLoading && styles.loading} ${className}`}
      onClick={onClickHandler}
    >
      {isLoading ? <Loader /> : text}
    </button>
  );
};

export default Button;
