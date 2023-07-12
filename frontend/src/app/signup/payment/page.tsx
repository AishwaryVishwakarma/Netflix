/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import styles from './styles.module.scss';
import Layout from '@/components/Layout/Layout';
import Header from '@/components/pages/signup/Header';
import Link from 'next/link';
import Protected from '@/components/Protected/Protected';
import useMediaQuery from '@/hooks/useMediaQuery';

/*
 * Payment Page [Protected]
 */

const PaymentPage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const submitHandler = (): void => {
    sessionStorage.removeItem('subscription');
  };

  return (
    <Layout className='full-bleed' fixedFooter>
      <div className={styles.paymentWrapper}>
        <Header isMobile={isMobile} hasRegistered />
        <div>
          <div className={styles.fadeInFromRight}>
            <img
              src='https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Lock.png'
              alt='stepLogo'
              className={styles.stepLogo}
            />
            <p>
              Step <b>3</b> of <b>3</b>
            </p>
            <h1>Choose how to pay</h1>
            <h3>Don't Worry you don't need to pay anything, Enjoy!</h3>
            <Link href='/' onClick={submitHandler}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Main: React.FC = () => {
  return <Protected Page={PaymentPage} />;
};

export default Main;
