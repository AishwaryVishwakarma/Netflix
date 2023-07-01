'use client';

import React from 'react';
import styles from './styles.module.scss';
import Layout from '@/components/Layout/Layout';
import Header from '@/components/pages/signup/Header';
import Intro from '@/components/pages/signup/Plans/Intro/Intro';

export const SCREEN_STATE = {
  INTRO: 'intro',
  FORM: 'form',
};

const PlansPage: React.FC = () => {
  const [screenState, setScreenState] = React.useState<string>(
    SCREEN_STATE.INTRO
  );
  return (
    <Layout className='full-bleed'>
      <div className={styles.plansWrapper}>
        <Header />
        {/* Intro Screen */}
        <Intro changeFormState={setScreenState} />
      </div>
    </Layout>
  );
};

export default PlansPage;
