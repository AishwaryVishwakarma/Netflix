import React from 'react';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import styles from './styles.module.scss';

const Loader = ({className = styles.loader}: {className?: string}) => {
  return <AiOutlineLoading3Quarters className={className} />;
};

export default Loader;
