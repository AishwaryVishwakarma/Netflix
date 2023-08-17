'use client';

import Layout from '@/components/Layout/Layout';
import React from 'react';
import styles from './styles.module.scss';
import Intro from '@/components/pages/signup/Registration/Intro/Intro';
import Form from '@/components/pages/signup/Registration/Form/Form';
import Header from '@/components/pages/signup/Header';
import useMediaQuery from '@/hooks/useMediaQuery';

/**
 * Registration Page (Contains 2 screens)
 */

export const SCREEN_STATE = {
  INTRO: 'intro',
  FORM: 'form',
} as const;

let sessionEmail: string | null;

const RegistrationPage = () => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const [screenState, setScreenState] = React.useState<string>(
    SCREEN_STATE.INTRO
  );

  if (typeof window !== 'undefined') {
    sessionEmail = sessionStorage.getItem('email');
  }

  return (
    <Layout className='full-bleed' fixedFooter>
      <div className={styles.registrationWrapper}>
        <Header isMobile={isMobile} />
        {/* Intro Screen */}
        {screenState === SCREEN_STATE.INTRO && (
          <Intro changeFormState={setScreenState} />
        )}
        {/* Form Screen */}
        {screenState === SCREEN_STATE.FORM && (
          <Form propsEmail={sessionEmail ?? ''} />
        )}
      </div>
    </Layout>
  );
};

export default RegistrationPage;
