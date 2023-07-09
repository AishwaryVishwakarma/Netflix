'use client';

import React from 'react';
import styles from './styles.module.scss';
import Layout from '@/components/Layout/Layout';
import DUMMY_PROFILES from '@/DUMMY_DATA/DUMMY_PROFILES';
import {UserModel} from '@/types';
import {useRouter} from 'next/navigation';
import Protected from '@/components/Protected/Protected';

const ProfilesPage: React.FC = () => {
  const router = useRouter();

  const userData = localStorage.getItem('user-data');

  if (!userData) {
    localStorage.clear();
    router.push('/');
    return;
  }

  return (
    <Layout className='full-bleed full-height defaultBg' footer={false}>
      <div className={styles.header}></div>
      <div className={styles.profilesWrapper}>
        <h1>Who&apos;s Watching?</h1>
        <div className={styles.profiles}>
          <div className={styles.profileCard}>
            <img src={DUMMY_PROFILES[0].url} alt='' />
            <p>{DUMMY_PROFILES[0].name}</p>
          </div>
        </div>
        <div className={styles.manageProfiles}>Manage Profiles</div>
      </div>
    </Layout>
  );
};

const Main: React.FC = () => {
  return <Protected Page={ProfilesPage} />;
};

export default Main;
