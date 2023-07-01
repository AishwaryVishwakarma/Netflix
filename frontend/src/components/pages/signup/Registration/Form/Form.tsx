/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styles from './styles.module.scss';
import {type FormData} from '@/app/signup/registration/page';
import axios from 'axios';
import {signup as SIGNUP_URL} from '@/END_POINTS';
import Loader from '@/utils/loader/loader';
import Button from '@/utils/Button/Button';

interface InputTouched {
  email: boolean;
  password: boolean;
}

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

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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

    setIsLoading(true);

    const trimmedEmail = email.trim().toLocaleLowerCase();

    try {
      const res = await axios.post(SIGNUP_URL, {
        email: trimmedEmail,
        password,
      });

      const data: {_id: string} = res.data;

      sessionStorage.setItem('userId', data._id);

      sessionStorage.setItem('email', trimmedEmail);

      window.location.href = '/signup/plans';
    } catch (error: any) {
      console.log(error.response.data);
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
          <Button type='submit' />
        </form>
      </div>
    </div>
  );
};

export default Form;
