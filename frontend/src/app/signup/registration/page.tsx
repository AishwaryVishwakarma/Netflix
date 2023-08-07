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

export interface FormData {
  email: string;
  password: string;
}

export const SCREEN_STATE = {
  INTRO: 'intro',
  FORM: 'form',
};

let sessionEmail: string | null;

const RegistrationPage = () => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const [formData, setFormData] = React.useState<FormData>((): FormData => {
    if (typeof window !== 'undefined') {
      sessionEmail = sessionStorage.getItem('email');
    }

    return {
      email: sessionEmail ? sessionEmail : '',
      password: '',
    };
  });

  const [screenState, setScreenState] = React.useState<string>(
    SCREEN_STATE.INTRO
  );

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
    <Layout className='full-bleed' fixedFooter>
      <div className={styles.registrationWrapper}>
        <Header isMobile={isMobile} />
        {/* Intro Screen */}
        {screenState === SCREEN_STATE.INTRO && (
          <Intro changeFormState={setScreenState} />
        )}
        {/* Form Screen */}
        {screenState === SCREEN_STATE.FORM && (
          <Form formData={formData} propsOnChange={onChangeHandler} />
        )}
      </div>
    </Layout>
  );
};

export default RegistrationPage;
