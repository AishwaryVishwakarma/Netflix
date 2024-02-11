import {SCREEN_STATE} from '@/app/profiles/types';
import BubbleLoader from '@/assets/loaders/BubbleLoader/BubbleLoader';
import {type UserProfileModel} from '@/types';
import Link from 'next/link';
import React from 'react';

import styles from './styles.module.scss';

/*
 * Default Screen
 */

const Default: React.FC<{
  profileData: UserProfileModel;
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
}> = ({profileData, changeScreen}) => {
  const {
    meta: {profile_creation_available},
    profiles,
  } = profileData ?? {};

  const [isNextPageLoading, setIsNextPageLoading] =
    React.useState<boolean>(false);

  return (
    <section className={styles.profilesWrapper}>
      <div>
        <h1>Who&apos;s Watching?</h1>
        <ul className={styles.profiles}>
          {profiles?.map((profile) => (
            <li key={profile._id}>
              <Link href='/home' className={styles.profileCard}>
                <img src={profile.icon} alt='profile' />
                <p>{profile.name}</p>
              </Link>
            </li>
          ))}
          {profile_creation_available && (
            <li
              className={styles.profileCard}
              onClick={(): void => changeScreen(SCREEN_STATE.ADD_PROFILE)}
            >
              <div className={styles.newProfile} />
              <p>Add Profile</p>
            </li>
          )}
        </ul>
        {isNextPageLoading ? (
          <BubbleLoader />
        ) : (
          <Link
            href='/manage-profiles'
            onClick={(): void => setIsNextPageLoading(true)}
          >
            Manage Profiles
          </Link>
        )}
      </div>
    </section>
  );
};

export default Default;
