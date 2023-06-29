import React from 'react';
import styles from './styles.module.scss';
import {AiOutlineCloseCircle, AiOutlineRight} from 'react-icons/ai';

const EmailScreen: React.FC<{
  email: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({email, onChangeHandler}) => {
  const [isEmailFocused, setIsEmailFocused] = React.useState<boolean>(false);

  const [isEmailLostFocus, setIsEmailLostFocus] =
    React.useState<boolean>(false);

  const wasEmailTouched = isEmailFocused && isEmailLostFocus;

  const isEmailValid =
    email.length > 1 && email.includes('@') && email.includes('.');

  const emailError =
    email.length > 1 &&
    wasEmailTouched &&
    (!email.includes('@') || !email.includes('.'));

  return (
    <div className={styles.emailScreenWrapper}>
      <h1>Unlimited movies, TV shows and more</h1>
      <h3>Watch anywhere. Cancel anytime.</h3>
      <p>
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <div className={styles.emailField}>
        <div
          className={`${styles.inputContainer} ${
            isEmailValid && styles.inputValid
          } ${emailError && styles.inputNotValid}`}
        >
          <input
            type='text'
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
        <button role='button' type='button'>
          Get Started <AiOutlineRight />
        </button>
      </div>
    </div>
  );
};

export default EmailScreen;
