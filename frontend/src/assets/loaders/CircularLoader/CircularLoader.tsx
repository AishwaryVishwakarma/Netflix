import React from 'react';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import styles from './styles.module.scss';

const CircularLoader = ({className}: {className?: string}) => {
  return (
    <AiOutlineLoading3Quarters className={`${styles.loader} ${className}`} />
  );
};

export default CircularLoader;
