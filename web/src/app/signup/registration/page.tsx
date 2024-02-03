'use client';

import Layout from '@/components/Layout/Layout';
import Header from '@/components/pages/signup/Header';
import Form from '@/components/pages/signup/Registration/Form/Form';
import Intro from '@/components/pages/signup/Registration/Intro/Intro';
import useMediaQuery from '@/hooks/useMediaQuery';
import {getStorage} from '@/utils/storage';
import React from 'react';

import styles from './styles.module.scss';
import {SCREEN_STATE} from './types';

/**
 * Registration Page (Contains 2 screens)
 */

let sessionEmail: string | null;

const RegistrationPage = () => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const [screenState, setScreenState] = React.useState<string>(
    SCREEN_STATE.INTRO
  );

  if (typeof window !== 'undefined') {
    [sessionEmail] = getStorage(['email'], sessionStorage);
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
