'use client';

import React from 'react';
import styles from './styles.module.scss';
import Layout from '@/components/Layout/Layout';
import Header from '@/components/pages/signup/Header';
import Intro from '@/components/pages/signup/Plans/Intro/Intro';
import Plans from '@/components/pages/signup/Plans/Plans/Plans';

/*
 * Plans Page (Contains 2 screen)
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
        <Header />
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

export default PlansPage;
