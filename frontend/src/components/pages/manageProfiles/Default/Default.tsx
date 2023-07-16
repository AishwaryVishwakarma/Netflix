import React from 'react';
import styles from './styles.module.scss';
import {type UserProfileModel} from '@/types';
import Edit from '@/utils/icons/Edit';
import {SCREEN_STATE} from '@/app/ManageProfiles/page';
import Link from 'next/link';

const Default: React.FC<{
  profileData: UserProfileModel;
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
}> = ({profileData, changeScreen}) => {
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
            <li className={styles.profileCard} key={profile._id}>
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
