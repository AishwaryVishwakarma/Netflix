'use client';

import Layout from '@/components/Layout/Layout';
import styles from './styles.module.scss';
import React from 'react';
import NetflixLogo from '@/utils/icons/NetflixLogo';
import Link from 'next/link';
import useMediaQuery from '@/hooks/useMediaQuery';

/*
 * Login Page
 */

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface InputTouched {
  email: boolean;
  password: boolean;
}

const PASSWORD_STATE = ['Hide', 'Show'];

let localEmail: string;

// Main function 👇

const LoginPage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const [isPasswordVisible, setIsPasswordVisibile] =
    React.useState<boolean>(false);

  const [formData, setFormData] = React.useState<FormData>({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [isInputFocused, setIsInputFocused] = React.useState<InputTouched>({
    email: false,
    password: false,
  });

  const [isInputLostFocus, setIsInputLostFocus] = React.useState<InputTouched>({
    email: false,
    password: false,
  });

  const onChangeHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const {name, value, type} = event.target;
    setFormData((prev): FormData => {
      if (type === 'checkbox') {
        return {
          ...prev,
          [name]: !prev.rememberMe,
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const setInputFocus = (event: any): void => {
    const {name}: {name: 'email' | 'password'} = event.target;
    setIsInputFocused((prev): InputTouched => {
      if (!prev[name]) {
        return {
          ...prev,
          [name]: true,
        };
      }
      return {
        ...prev,
      };
    });
  };

  const setInputBlur = (event: any): void => {
    const {name}: {name: 'email' | 'password'} = event.target;
    setIsInputLostFocus((prev): InputTouched => {
      if (!prev[name]) {
        return {
          ...prev,
          [name]: true,
        };
      }
      return {
        ...prev,
      };
    });
  };

  React.useEffect((): void => {
    localEmail = sessionStorage.getItem('email') as string;

    if (localEmail)
      setFormData((prev): FormData => {
        return {
          ...prev,
          email: localEmail,
        };
      });
  }, []);

  const emailInputError =
    formData.email.length == 0 &&
    isInputFocused.email &&
    isInputLostFocus.email;

  const passwordInputError =
    formData.password.length < 5 &&
    isInputFocused.password &&
    isInputLostFocus.password;

  return (
    <Layout className={`full-bleed ${isMobile && 'darkBg'}`} footerType='auth'>
      <section className={styles.loginWrapper}>
        <img
          src={
            isMobile
              ? ''
              : 'https://assets.nflxext.com/ffe/siteui/vlv3/d282a426-b01a-424c-9b83-2c2445e4b61a/f7eb3bc2-2867-4c7e-94f8-e62ec11175cd/IN-en-20230626-popsignuptwoweeks-perspective_alpha_website_large.jpg'
          }
          alt='background'
          className={styles.background}
        />
        <div className={styles.heroSection}>
          <NetflixLogo
            height={isMobile ? 20 : 45}
            width={isMobile ? 75 : 167}
            color='#e50914'
          />
          <div className={styles.flexbox}>
            <div className={styles.formConatiner}>
              <h1>Sign In</h1>
              <form action=''>
                <div className={styles.inputs}>
                  <div className={styles.inputContainer}>
                    <input
                      data-input-error={emailInputError}
                      type='email'
                      name='email'
                      id='email'
                      value={formData.email}
                      placeholder=' '
                      onChange={onChangeHandler}
                      onFocus={setInputFocus}
                      onBlur={setInputBlur}
                      required
                    />
                    <label htmlFor='email'>Email or Phone Number</label>
                  </div>
                  {emailInputError && (
                    <p className={styles.error}>
                      Please enter a valid email address or phone number.
                    </p>
                  )}
                  <div className={styles.inputContainer}>
                    <input
                      data-input-error={
                        formData.password.length == 0 &&
                        isInputFocused.password &&
                        isInputLostFocus.password
                      }
                      type={isPasswordVisible ? 'text' : 'password'}
                      name='password'
                      id='password'
                      value={formData.password}
                      placeholder=' '
                      onChange={onChangeHandler}
                      onFocus={setInputFocus}
                      onBlur={setInputBlur}
                      required
                    />
                    <label htmlFor='password'>Password</label>
                    <p
                      className={styles.passwordVisibilty}
                      onClick={(): void => {
                        setIsPasswordVisibile((prev): boolean => !prev);
                      }}
                    >
                      {PASSWORD_STATE[isPasswordVisible ? 0 : 1]}
                    </p>
                  </div>
                  {passwordInputError && (
                    <p className={styles.error}>
                      Your password must contain between 4 and 60 characters.
                    </p>
                  )}
                </div>
                <button type='submit'>Sign In</button>
                <div className={styles.helpSection}>
                  <div className={styles.rememberMe}>
                    <input
                      type='checkbox'
                      id='rememberMe'
                      name='rememberMe'
                      checked={formData.rememberMe}
                      onChange={onChangeHandler}
                    />
                    <label htmlFor='rememberMe'>Remember Me</label>
                  </div>
                  <p>Need Help?</p>
                </div>
              </form>
              <div className={styles.signUp}>
                New to Netflix? <Link href='/signup'>Sign up now.</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isMobile && <div className={styles.footerDivider} />}
    </Layout>
  );
};

export default LoginPage;
