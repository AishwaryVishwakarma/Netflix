/* eslint-disable react/no-unescaped-entities */
'use client';

import Layout from '@/components/Layout/Layout';
import React from 'react';
import styles from './styles.module.scss';
import NetflixLogo from '@/icons/NetflixLogo';
import Link from 'next/link';
import axios from 'axios';
import {signup as SIGNUP_URL} from '@/END_POINTS';

/*
 * Registration Page (Contains 2 screens)
 */

interface FormData {
  email: string;
  password: string;
}

interface InputTouched {
  email: boolean;
  password: boolean;
}

const SCREEN_STATE = {
  INTRO: 'intro',
  FORM: 'form',
};

let localEmail: string;

/*
 * Intro Screen
 */

const Intro: React.FC<{
  changeFormState: React.Dispatch<React.SetStateAction<string>>;
}> = ({changeFormState}) => {
  return (
    <div className={styles.introWrapper}>
      <div className={styles.fadeInFromRight}>
        <img
          src='https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Devices.png'
          alt='stepLogo'
          className={styles.setupLogo}
        />
        <p>
          Step <b>1</b> of <b>3</b>
        </p>
        <h1>Finish setting up your account</h1>
        <h3>
          Netflix is personalised for you. Create a password to watch on any
          device at any time.
        </h3>
        <button
          role='button'
          type='button'
          onClick={(): void => changeFormState(SCREEN_STATE.FORM)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

/*
 * Registration Form Screen
 */

const Form: React.FC<{
  formData: FormData;
  propsOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({formData, propsOnChange}) => {
  const {email, password} = formData;

  const [isInputFocused, setIsInputFocused] = React.useState<InputTouched>({
    email: false,
    password: false,
  });

  const [isInputLostFocus, setIsInputLostFocus] = React.useState<InputTouched>({
    email: false,
    password: false,
  });

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

  // On Sign Up Form Submit
  const signupHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await axios.post(SIGNUP_URL, {
        email: email.trim().toLocaleLowerCase(),
        password,
      });

      const data: {_id: string} = res.data;

      localStorage.setItem('userId', data._id);

    } catch (error: any) {
      console.log(error.response);
    }
  };

  const emailInputError =
    formData.email.length == 0 &&
    isInputFocused.email &&
    isInputLostFocus.email;

  const passwordInputError =
    formData.password.length < 5 &&
    isInputFocused.password &&
    isInputLostFocus.password;

  return (
    <div className={styles.flexBox}>
      <div className={`${styles.formWrapper} ${styles.fadeInFromRight}`}>
        <p>
          STEP <b>1</b> OF <b>3</b>
        </p>
        <h1>Create a password to start your membership</h1>
        <h3>Just a few more steps and you're done! We hate paperwork, too.</h3>
        <form onSubmit={signupHandler}>
          <div className={styles.inputs}>
            <div className={styles.inputContainer}>
              <input
                data-input-error={emailInputError}
                type='email'
                name='email'
                id='email'
                value={formData.email}
                placeholder=' '
                onChange={(e) => propsOnChange(e)}
                onFocus={(e) => setInputFocus(e)}
                onBlur={(e) => setInputBlur(e)}
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
                type='password'
                name='password'
                id='password'
                value={formData.password}
                placeholder=' '
                onChange={(e) => propsOnChange(e)}
                onFocus={(e) => setInputFocus(e)}
                onBlur={(e) => setInputBlur(e)}
                required
              />
              <label htmlFor='password'>Password</label>
            </div>
            {passwordInputError && (
              <p className={styles.error}>
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </div>
          <button>Next</button>
        </form>
      </div>
    </div>
  );
};

/*
 * Registration Page
 */

const RegistrationPage = () => {
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
    localEmail = localStorage.getItem('email') as string;

    setFormData((prev): FormData => {
      return {
        ...prev,
        email: localEmail,
      };
    });
  }, []);

  return (
    <Layout className='full-bleed'>
      <div className={styles.registrationWrapper}>
        <header>
          <NetflixLogo height={45} width={167} color='#e50914' />
          <Link href='/'>Sign In</Link>
        </header>
        {screenState === SCREEN_STATE.INTRO && (
          <Intro changeFormState={setScreenState} />
        )}
        {screenState === SCREEN_STATE.FORM && (
          <Form formData={formData} propsOnChange={onChangeHandler} />
        )}
      </div>
    </Layout>
  );
};

export default RegistrationPage;
