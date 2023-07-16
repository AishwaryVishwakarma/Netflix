'use client';

import Layout from '@/components/Layout/Layout';
import React from 'react';
import styles from './styles.module.scss';
import {AiOutlineCloseCircle, AiOutlineRight} from 'react-icons/ai';
import NetflixLogo from '@/utils/icons/NetflixLogo';
import Link from 'next/link';
import Loader from '@/utils/loader/loader';
import axios from 'axios';
import {checkUser as CHECK_USER_EXIST_URL} from '@/END_POINTS';
import {useRouter} from 'next/navigation';
import useMediaQuery from '@/hooks/useMediaQuery';
import {clearStorage} from '@/FUNCTIONS';

/*
 * Sign Up Page
 */

let sessionEmail: string | null;

const SignupPage: React.FC = () => {
  const router = useRouter();

  clearStorage(['user-data', 'auth-token'], localStorage);

  const isMobile = useMediaQuery('(max-width: 800px)');

  const [email, setEmail] = React.useState<string>((): string => {
    sessionEmail = sessionStorage.getItem('email');

    return sessionEmail ? sessionEmail : '';
  });

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

  // Form Submit Handler

  async function emailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    const trimmedEmail = email.trim().toLocaleLowerCase();

    sessionStorage.setItem('email', trimmedEmail);

    try {
      const checkUserExist = await axios.post(CHECK_USER_EXIST_URL, {
        email: trimmedEmail,
      });

      // Sending user back to login pack if the user account already exists
      if (checkUserExist.status) router.push('/');
    } catch (error: any) {
      const status = error.response?.status;

      if (status === 404) router.push('/signup/registration');
    }
  }

  return (
    <Layout className='full-bleed' footerType='auth' fixedFooter>
      <section className={styles.signupWrapper}>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/d282a426-b01a-424c-9b83-2c2445e4b61a/f7eb3bc2-2867-4c7e-94f8-e62ec11175cd/IN-en-20230626-popsignuptwoweeks-perspective_alpha_website_large.jpg'
          alt='background'
          className={styles.background}
        />
        <div className={styles.heroSection}>
          <div className={styles.header}>
            <NetflixLogo
              height={40}
              width={isMobile ? 89 : 148}
              color='#e50914'
            />
            <Link href='/'>Sign In</Link>
          </div>
          <div className={styles.emailWrapper}>
            <h1>Unlimited movies, TV shows and more</h1>
            <h3>Watch anywhere. Cancel anytime.</h3>
            <p>
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <form className={styles.emailField} onSubmit={emailSubmit}>
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
                  onChange={onChangeHandler}
                  onFocus={(): void => setIsEmailFocused(true)}
                  onBlur={(): void => setIsEmailLostFocus(true)}
                  required
                />
                <label htmlFor='email'>Email address</label>
                {emailError && (
                  <p className={styles.errorField}>
                    <AiOutlineCloseCircle />
                    Please enter a valid email address.
                  </p>
                )}
              </div>
              <button type='submit' className={isLoading ? styles.loading : ''}>
                {isLoading ? (
                  <Loader />
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
      {isMobile && <div className={styles.footerDivider} />}
    </Layout>
  );
};

export default SignupPage;
