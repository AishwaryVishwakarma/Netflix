'use client';

import React from 'react';
import styles from './styles.module.scss';
import {type UserProfileModel} from '@/types';
import {useRouter} from 'next/navigation';
import {clearStorage} from '@/FUNCTIONS';
import axios from 'axios';
import {userProfile as GET_USER_PROFILE_URL} from '@/END_POINTS';
import Protected from '@/components/Protected/Protected';
import Layout from '@/components/Layout/Layout';
import Loader from '@/utils/loader/loader';
import Default from '@/components/pages/manageProfiles/Default/Default';
import AddProfile from '@/components/pages/profiles/AddProfile/AddProfile';
import EditProfile from '@/components/pages/manageProfiles/EditProfile/EditProfile';

export const SCREEN_STATE = {
  DEFAULT: 'default',
  ADD_PROFILE: 'addProfile',
  EDIT_PROFILE: 'editProfile',
};

const ManageProfilesPage: React.FC = () => {
  const router = useRouter();

  const [screenState, setScreenState] = React.useState<string>(
    SCREEN_STATE.DEFAULT
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // Profile data which user is currently editing
  const [profileData, setProfileData] = React.useState<UserProfileModel>();

  const [editProfileData, setEditProfileData] =
    React.useState<UserProfileModel['profiles']>();

  // Decide whether to refresh the profiles
  const [refreshProfiles, setRefreshProfiles] = React.useState<boolean>(true);

  const userData = localStorage.getItem('user-data');

  const authToken = localStorage.getItem('auth-token');

  // Getting the associated profiles object ID
  const {
    meta: {profile_id: user_profile_id},
  } = JSON.parse(userData ?? '');

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
        console.log(err);
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

  // Get the profile data for the profile that is currently editing
  const get_edit_profile_data = (id: string): null | void => {
    const profilesArray = profileData?.profiles;
    if (!profilesArray) {
      return null;
    }

    for (const profile of profilesArray) {
      if (id === profile._id) {
        setEditProfileData([profile]);
        break;
      }
    }
  };

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
              getEditProfileData={get_edit_profile_data}
            />
          )}
          {screenState === SCREEN_STATE.ADD_PROFILE && (
            <AddProfile
              profileData={profileData as UserProfileModel}
              changeScreen={setScreenState}
              refreshProfileData={setRefreshProfiles}
            />
          )}
          {screenState === SCREEN_STATE.EDIT_PROFILE && (
            <EditProfile
              profileData={editProfileData as UserProfileModel['profiles']}
              changeScreen={setScreenState}
              refreshProfileData={setRefreshProfiles}
              userProfileId={user_profile_id}
            />
          )}
        </>
      )}
    </Layout>
  );
};

const Main: React.FC = () => {
  return <Protected Page={ManageProfilesPage} />;
};

export default Main;
