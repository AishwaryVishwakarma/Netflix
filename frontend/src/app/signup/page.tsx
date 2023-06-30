'use client';

import Layout from '@/components/Layout/Layout';
import React from 'react';
import styles from './styles.module.scss';
import {
  AiOutlineCloseCircle,
  AiOutlineRight,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import NetflixLogo from '@/icons/NetflixLogo';
import Link from 'next/link';
// import {redirect} from 'next/navigation';

/*
 * Sign Up Page
 */

let localEmail: string;

const SignupPage: React.FC = () => {
  const [email, setEmail] = React.useState<string>('');

  const [isEmailFocused, setIsEmailFocused] = React.useState<boolean>(false);

  const [isEmailLostFocus, setIsEmailLostFocus] =
    React.useState<boolean>(false);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const {value} = event.target;
    setEmail(value);
  };

  const wasEmailTouched = isEmailFocused && isEmailLostFocus;

  const isEmailValid =
    email.length > 1 && email.includes('@') && email.includes('.');

  const emailError =
    email.length > 1 &&
    wasEmailTouched &&
    (!email.includes('@') || !email.includes('.'));

  function emailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    localStorage.setItem('email', email);

    // NextJs redirect has some bug so using this to navigate

    window.location.href = '/signup/registration';

    // redirect('/');
  }

  React.useEffect((): void => {
    localEmail = localStorage.getItem('email') as string;

    if (localEmail) setEmail(localEmail);
  }, []);

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
          <div className={styles.emailWrapper}>
            <h1>Unlimited movies, TV shows and more</h1>
            <h3>Watch anywhere. Cancel anytime.</h3>
            <p>
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <form
              className={styles.emailField}
              onSubmit={(e) => emailSubmit(e)}
            >
              <div
                className={`${styles.inputContainer} ${
                  isEmailValid && styles.inputValid
                } ${emailError && styles.inputNotValid}`}
              >
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={email}
                  placeholder=' '
                  onChange={(e): void => onChangeHandler(e)}
                  onFocus={(): void => setIsEmailFocused(true)}
                  onBlur={(): void => setIsEmailLostFocus(true)}
                  required
                />
                <label htmlFor='email'>Email or Phone Number</label>
                {emailError && (
                  <p className={styles.errorField}>
                    <AiOutlineCloseCircle />
                    Please enter a valid email address.
                  </p>
                )}
              </div>
              <button type='submit' className={isLoading ? styles.loading : ''}>
                {isLoading ? (
                  <AiOutlineLoading3Quarters />
                ) : (
                  <>
                    Get Started <AiOutlineRight />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignupPage;
