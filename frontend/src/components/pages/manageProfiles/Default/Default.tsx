import React from 'react';
import styles from './styles.module.scss';
import {type UserProfileModel} from '@/types';
import Edit from '@/assets/icons/Edit';
import {SCREEN_STATE} from '@/app/manage-profiles/types';
import Link from 'next/link';

/*
 * Default Screen for Manage Profiles
 */

const Default: React.FC<{
  profileData: UserProfileModel;
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
  getEditProfileData: (id: string) => void;
}> = ({profileData, changeScreen, getEditProfileData}) => {
  const {
    meta: {profile_creation_available},
    profiles,
  } = profileData ?? {};

  return (
    <section className={styles.manageProfilesWrapper}>
      <div>
        <h1>Manage Profiles</h1>
        <ul className={styles.profiles}>
          {profiles?.map((profile) => (
            <li
              className={styles.profileCard}
              key={profile._id}
              onClick={(): void => {
                getEditProfileData(profile._id);
                changeScreen(SCREEN_STATE.EDIT_PROFILE);
              }}
            >
              <Edit />
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
        <Link href='/profiles' className={styles.doneButton}>
          Done
        </Link>
      </div>
    </section>
  );
};

export default Default;
