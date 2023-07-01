import React from 'react';
import Loader from '../loader/loader';
import styles from './styles.module.scss';

interface ButtonProps {
  submitFunction: () => Promise<void>;
}

const Button: React.FC<ButtonProps> = ({submitFunction}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onClickHandler = () => {
    setIsLoading(true);

    submitFunction();

    setIsLoading(false);
  };
  return (
    <button
      role='button'
      type='button'
      className={`${styles.button} ${isLoading ? styles.loading : ''}`}
      onClick={onClickHandler}
    >
      {isLoading ? <Loader /> : 'Next'}
    </button>
  );
};

export default Button;
