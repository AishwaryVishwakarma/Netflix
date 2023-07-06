/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styles from './styles.module.scss';
import {type FormData} from '@/app/signup/registration/page';
import axios from 'axios';
import {signup as SIGNUP_URL} from '@/END_POINTS';
import Loader from '@/utils/loader/loader';
import {useRouter} from 'next/navigation';

/*
 * Registration Form Screen
 */

interface InputTouched {
  email: boolean;
  password: boolean;
}

const Form: React.FC<{
  formData: FormData;
  propsOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({formData, propsOnChange}) => {
  const router = useRouter();

  const {email, password} = formData;

  const [isInputFocused, setIsInputFocused] = React.useState<InputTouched>({
    email: false,
    password: false,
  });

  const [isInputLostFocus, setIsInputLostFocus] = React.useState<InputTouched>({
    email: false,
    password: false,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string>('');

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

    setError('');

    setIsLoading(true);

    const trimmedEmail = email.trim().toLocaleLowerCase();

    try {
      const res = await axios.post(SIGNUP_URL, {
        email: trimmedEmail,
        password,
      });

      const {jwtToken}: {id: string; jwtToken: string} = res?.data;

      localStorage.setItem('auth-token', jwtToken);

      sessionStorage.setItem('email', trimmedEmail);

      router.push('/signup/plans');
    } catch (error: any) {
      const stateError = error?.response?.data?.detail;

      setError(stateError);

      setIsLoading(false);
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
                onChange={propsOnChange}
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
                type='password'
                name='password'
                id='password'
                value={formData.password}
                placeholder=' '
                onChange={propsOnChange}
                onFocus={setInputFocus}
                onBlur={setInputBlur}
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
          <button className={isLoading ? styles.loading : ''}>
            {isLoading ? <Loader /> : 'Next'}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Form;
