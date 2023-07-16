import React from 'react';
import styles from './styles.module.scss';
import {type UserProfileModel} from '@/types';
import {SCREEN_STATE} from '@/app/profiles/page';

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

  return (
    <section className={styles.profilesWrapper}>
      <div>
        <h1>Who&apos;s Watching?</h1>
        <ul className={styles.profiles}>
          {profiles?.map((profile) => (
            <li className={styles.profileCard} key={profile._id}>
              <img src={profile.icon} alt='profile' />
              <p>{profile.name}</p>
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
        <div
          className={styles.manageProfiles}
          onClick={(): void => changeScreen(SCREEN_STATE.MANAGE_PROFILES)}
        >
          Manage Profiles
        </div>
      </div>
    </section>
  );
};

export default Default;
