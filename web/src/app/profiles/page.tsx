'use client';

import {userProfile as GET_USER_PROFILE_URL} from '@/END_POINTS';
import CircularLoader from '@/assets/loaders/CircularLoader/CircularLoader';
import Layout from '@/components/Layout/Layout';
import Protected from '@/components/Protected/Protected';
import AddProfile from '@/components/pages/profiles/AddProfile/AddProfile';
import Default from '@/components/pages/profiles/Default/Default';
import {type UserModel, type UserProfileModel} from '@/types';
import {clearStorage, getStorage} from '@/utils/storage';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import React from 'react';

import styles from './styles.module.scss';
import {SCREEN_STATE} from './types';

/**
 * Profiles Page (Contains 2 screens) [Protected]
 */

let userData: string | null;

let authToken: string | null;

const ProfilesPage: React.FC = () => {
  const router = useRouter();

  const [screenState, setScreenState] = React.useState<string>(
    SCREEN_STATE.DEFAULT
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [profileData, setProfileData] = React.useState<UserProfileModel>();

  // Decide whether to refresh the profiles
  const [refreshProfiles, setRefreshProfiles] = React.useState<boolean>(true);

  if (typeof window !== 'undefined') {
    [userData, authToken] = getStorage(
      ['user-data', 'auth-token'],
      localStorage
    );
  }

  // Getting the associated profiles object ID
  const {
    meta: {profiles_id: USER_PROFILES_ID},
  }: UserModel = JSON.parse(userData ?? '');

  React.useEffect(() => {
    // Only fetching the data when user has added a profile
    if (screenState !== SCREEN_STATE.DEFAULT || !refreshProfiles) return;

    // Using this to cancel the request if the component changes before the request is completed
    const cancelToken = axios.CancelToken.source();

    setIsLoading(true);

    axios
      .get(GET_USER_PROFILE_URL + USER_PROFILES_ID, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        const profiles: UserProfileModel = res.data?.user_profile;
        setProfileData(profiles);
      })
      .catch((err) => {
        console.debug(err);
        // To check if the error is due to cancellation of the request
        if (!axios.isCancel(err)) {
          clearStorage(['user-data', 'auth-token'], localStorage);
          router.push('/');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return (): void => {
      cancelToken.cancel();
    };
  }, [USER_PROFILES_ID, router, screenState, refreshProfiles]);

  return (
    <Layout className='full-bleed full-height defaultBg' footer={false}>
      <div className={styles.header} />
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <CircularLoader />
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
