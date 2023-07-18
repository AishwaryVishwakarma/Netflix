'use client';

import React from 'react';
import styles from './styles.module.scss';
import Layout from '@/components/Layout/Layout';
import {type UserProfileModel} from '@/types';
import {useRouter} from 'next/navigation';
import Protected from '@/components/Protected/Protected';
import {userProfile as GET_USER_PROFILE_URL} from '@/END_POINTS';
import {clearStorage} from '@/FUNCTIONS';
import axios from 'axios';
import Loader from '@/utils/loader/loader';
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

  // Decide whether to refresh the profiles
  const [refreshProfiles, setRefreshProfiles] = React.useState<boolean>(true);

  const userData = localStorage.getItem('user-data');

  const authToken = localStorage.getItem('auth-token');

  React.useEffect(() => {
    // Only fetching the data when user has added a profile
    if (screenState !== SCREEN_STATE.DEFAULT || !refreshProfiles) return;

    if (!userData || !authToken) {
      clearStorage(['user-data', 'auth-token'], localStorage);
      router.push('/');
      return;
    }

    setIsLoading(true);

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
        clearStorage(['user-data', 'auth-token'], localStorage);
        router.push('/');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [authToken, userData, router, screenState, refreshProfiles]);

  if (!userData || !authToken) {
    clearStorage(['user-data', 'auth-token'], localStorage);
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
