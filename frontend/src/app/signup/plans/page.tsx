'use client';

import React from 'react';
import styles from './styles.module.scss';
import Layout from '@/components/Layout/Layout';
import Header from '@/components/pages/signup/Header';
import Intro from '@/components/pages/signup/Plans/Intro/Intro';
import Plans from '@/components/pages/signup/Plans/Plans/Plans';
import Protected from '@/components/Protected/Protected';

/*
 * Plans Page (Contains 2 screen) [Protected]
 */

export const SCREEN_STATE = {
  INTRO: 'intro',
  PLANS: 'plans',
};

const PlansPage: React.FC = () => {
  const [screenState, setScreenState] = React.useState<string>(
    SCREEN_STATE.INTRO
  );

  // Setting plan in order to get a default plan
  React.useEffect((): void => {
    const subscription = {
      type: 'premium',
      value: '649',
    };

    sessionStorage.setItem('subscription', JSON.stringify(subscription));
  }, []);

  return (
    <Layout className='full-bleed'>
      <div className={styles.plansWrapper}>
        <Header hasRegistered />
        {/* Intro Screen */}
        {screenState === SCREEN_STATE.INTRO && (
          <Intro changeFormState={setScreenState} />
        )}
        {/* Plans Screen */}
        {screenState === SCREEN_STATE.PLANS && <Plans />}
      </div>
    </Layout>
  );
};

const Main: React.FC = () => {
  return <Protected Page={PlansPage} />;
};

export default Main;
