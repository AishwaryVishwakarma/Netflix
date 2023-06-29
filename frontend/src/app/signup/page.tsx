'use client';

import Layout from '@/components/Layout/Layout';
import React from 'react';
import styles from './styles.module.scss';
import NetflixLogo from '@/icons/NetflixLogo';
import Link from 'next/link';
import EmailScreen from '@/components/pages/signup/EmailScreen/EmailScreen';

interface FormData {
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    email: '',
    password: '',
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const {name, value} = event.target;
    setFormData((prev): FormData => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <Layout className='full-bleed'>
      <section className={styles.signupWrapper}>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/d282a426-b01a-424c-9b83-2c2445e4b61a/f7eb3bc2-2867-4c7e-94f8-e62ec11175cd/IN-en-20230626-popsignuptwoweeks-perspective_alpha_website_large.jpg'
          alt='background'
          className={styles.background}
        />
        <div className={styles.heroSection}>
          <div className={styles.header}>
            <NetflixLogo height={40} width={148} color='#e50914' />
            <Link href='/'>Sign In</Link>
          </div>
            <EmailScreen
              email={formData.email}
              onChangeHandler={onChangeHandler}
            />
        </div>
      </section>
    </Layout>
  );
};

export default SignupPage;
