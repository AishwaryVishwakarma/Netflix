/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import styles from './styles.module.scss';
import Layout from '@/components/Layout/Layout';
import Header from '@/components/pages/signup/Header';
import Link from 'next/link';

/*
 * Payment Page
 */

const PaymentPage: React.FC = () => {
  const submitHandler = (): void => {
    sessionStorage.removeItem('subscription');
    sessionStorage.removeItem('userId');
  };

  return (
    <Layout className='full-bleed'>
      <div className={styles.paymentWrapper}>
        <Header />
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

export default PaymentPage;
