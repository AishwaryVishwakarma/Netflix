/* eslint-disable react/no-unescaped-entities */
'use client';

import Layout from '@/components/Layout/Layout';
import React from 'react';
import styles from './styles.module.scss';
import Intro from '@/components/pages/signup/Registration/Intro/Intro';
import Form from '@/components/pages/signup/Registration/Form/Form';
import Header from '@/components/pages/signup/Header';
import useMediaQuery from '@/hooks/useMediaQuery';

/*
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

let sessionEmail: string;

/*
 * Registration Page
 */

const RegistrationPage = () => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const [formData, setFormData] = React.useState<FormData>({
    email: '',
    password: '',
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

  // Get the email that was stored in local storage by email screen in SignUp Page
  React.useEffect((): void => {
    sessionEmail = sessionStorage.getItem('email') as string;

    if (sessionEmail)
      setFormData((prev): FormData => {
        return {
          ...prev,
          email: sessionEmail,
        };
      });
  }, []);

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
