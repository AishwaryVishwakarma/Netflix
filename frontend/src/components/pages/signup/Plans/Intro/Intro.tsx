import React from 'react';
import styles from './styles.module.scss';
import {SCREEN_STATE} from '@/app/signup/plans/page';
import CheckMark from '@/utils/icons/CheckMark';

const FEATURES = [
  'No commitments, cancel anytime.',
  'Everything on Netflix for one low price.',
  'No ads and no extra fees. Ever.',
];

const Intro: React.FC<{
  changeFormState: React.Dispatch<React.SetStateAction<string>>;
}> = ({changeFormState}) => {
  return (
    <div className={styles.introWrapper}>
      <div className={styles.fadeInFromRight}>
        <img
          src='https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Checkmark.png'
          alt='stepLogo'
          className={styles.stepLogo}
        />
        <p>
          Step <b>2</b> of <b>3</b>
        </p>
        <h1>Choose your plan.</h1>
        <ul>
          {FEATURES.map((feature, idx) => (
            <li key={idx}>
              <CheckMark />
              <h3>{feature}</h3>
            </li>
          ))}
        </ul>
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
