'use client';

import React from 'react';
import styles from './styles.module.scss';
import Layout from '@/components/Layout/Layout';
import {type UserProfileModel} from '@/types';
import {useRouter} from 'next/navigation';
import Protected from '@/components/Protected/Protected';
import {userprofile as GET_USER_PROFILE_URL} from '@/END_POINTS';
import ICONS_ARRAY from '@/DATA/PROFILE_ICONS';
import axios from 'axios';
import Loader from '@/utils/loader/loader';

function clearLocalStorage([...args]: Array<string>): void {
  args.map((key): void => localStorage.removeItem(key));
}

const ProfilesPage: React.FC = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [profiles, setProfiles] = React.useState<UserProfileModel['profiles']>(
    []
  );

  const userData = localStorage.getItem('user-data');

  const authToken = localStorage.getItem('auth-token');

  React.useEffect(() => {
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
        const profiles: UserProfileModel['profiles'] =
          res.data?.user_profile?.profiles;
        setProfiles(profiles);
      })
      .catch((err) => {
        clearLocalStorage(['user-data', 'auth-token']);
        router.push('/');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [authToken, userData, router]);

  if (!userData || !authToken) {
    clearLocalStorage(['user-data', 'auth-token']);
    router.push('/');
    return;
  }

  return (
    <Layout className='full-bleed full-height defaultBg' footer={false}>
      <div className={styles.header}></div>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={styles.profilesWrapper}>
          <h1>Who&apos;s Watching?</h1>
          <div className={styles.profiles}>
            {profiles.map((profile) => (
              <div className={styles.profileCard} key={profile._id}>
                <img src={profile.icon} alt='' />
                <p>{profile.name}</p>
              </div>
            ))}
          </div>
          <div className={styles.manageProfiles}>Manage Profiles</div>
        </div>
      )}
    </Layout>
  );
};

const Main: React.FC = () => {
  return <Protected Page={ProfilesPage} />;
};

export default Main;
