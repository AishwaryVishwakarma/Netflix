'use client';

import Layout from '@/components/Layout/Layout';
import Protected from '@/components/Protected/Protected';
import Header from '@/components/pages/signup/Header';
import useMediaQuery from '@/hooks/useMediaQuery';
import {clearStorage} from '@/utils/storage';
import Link from 'next/link';
import React from 'react';

import styles from './styles.module.scss';

/**
 * Payment Page [Protected]
 */

const PaymentPage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const submitHandler = (): void => {
    clearStorage(['subscription'], sessionStorage);
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
            <h3>Don&apos; Worry you don&apos; need to pay anything, Enjoy!</h3>
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
