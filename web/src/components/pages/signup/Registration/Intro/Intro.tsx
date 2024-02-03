import {SCREEN_STATE} from '@/app/signup/registration/types';
import React from 'react';

import styles from './styles.module.scss';

/*
 * Registration Intro Screen
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
          className={styles.stepLogo}
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

export default Intro;
