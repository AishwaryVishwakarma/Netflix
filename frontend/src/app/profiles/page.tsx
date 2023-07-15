'use client';

import React from 'react';
import styles from './styles.module.scss';
import Layout from '@/components/Layout/Layout';
import {type UserProfileModel} from '@/types';
import {useRouter} from 'next/navigation';
import Protected from '@/components/Protected/Protected';
import {userprofile as GET_USER_PROFILE_URL} from '@/END_POINTS';
import {clearLocalStorage} from '@/FUNCTIONS';
import axios from 'axios';
import Loader from '@/utils/loader/loader';
import Link from 'next/link';
import Default from '@/components/pages/profiles/Default/Default';
import AddProfile from '@/components/pages/profiles/AddProfile/AddProfile';

/*
/ Profiles Page
*/

export const SCREEN_STATE = {
  DEFAULT: 'default',
  ADD_PROFILE: 'addProfile',
};

const ProfilesPage: React.FC = () => {
  const router = useRouter();

  const [screenState, setScreenState] = React.useState<string>(
    SCREEN_STATE.DEFAULT
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [profileData, setProfileData] = React.useState<UserProfileModel>();

  const [refreshProfiles, setRefreshProfiles] = React.useState<boolean>(true);

  const userData = localStorage.getItem('user-data');

  const authToken = localStorage.getItem('auth-token');

  React.useEffect(() => {
    if (screenState === SCREEN_STATE.ADD_PROFILE || !refreshProfiles) return;

    setIsLoading(true);

    if (!userData || !authToken) {
      clearLocalStorage(['user-data', 'auth-token']);
      router.push('/');
      return;
    }

    axios
      .get(GET_USER_PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        const profiles: UserProfileModel = res.data?.user_profile;
        setProfileData(profiles);
      })
      .catch((err) => {
        clearLocalStorage(['user-data', 'auth-token']);
        router.push('/');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [authToken, userData, router, screenState, refreshProfiles]);

  if (!userData || !authToken) {
    clearLocalStorage(['user-data', 'auth-token']);
    router.push('/');
    return;
  }

  return (
    <Layout className='full-bleed full-height defaultBg' footer={false}>
      <div className={styles.header} />
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <>
          {screenState === SCREEN_STATE.DEFAULT && (
            <Default
              profileData={profileData as UserProfileModel}
              changeScreen={setScreenState}
            />
          )}
          {screenState === SCREEN_STATE.ADD_PROFILE && (
            <AddProfile
              profileData={profileData as UserProfileModel}
              changeScreen={setScreenState}
              refreshProfileData={setRefreshProfiles}
            />
          )}
        </>
      )}
    </Layout>
  );
};

const Main: React.FC = () => {
  return <Protected Page={ProfilesPage} />;
};

export default Main;
