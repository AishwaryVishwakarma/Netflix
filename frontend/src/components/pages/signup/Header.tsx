import NetflixLogo from '@/utils/icons/NetflixLogo';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.scss';

/*
 * Registration Header
 */

const Header: React.FC<{isMobile: boolean; hasRegistered?: boolean}> = ({
  isMobile,
  hasRegistered = false,
}) => {
  const submitHandler = () => {
    if (hasRegistered) {
      localStorage.clear();
      sessionStorage.clear();
    }
  };

  return (
    <header className={styles.header}>
      <NetflixLogo
        height={isMobile ? 20 : 45}
        width={isMobile ? 75 : 167}
        color='#e50914'
      />
      <Link href='/' onClick={submitHandler}>
        {hasRegistered ? 'Cancel' : 'Sign In'}
      </Link>
    </header>
  );
};

export default Header;
