import React from 'react';
import styles from './styles.module.scss';
import {type UserProfileModel} from '@/types';
import {SCREEN_STATE} from '@/app/profiles/page';
import Edit from '@/utils/icons/Edit';

const ManageProfiles: React.FC<{
  profileData: UserProfileModel;
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
  refreshProfileData: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({profileData, changeScreen, refreshProfileData}) => {
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
        <button
          type='button'
          className={styles.doneButton}
          onClick={(): void => {
            changeScreen(SCREEN_STATE.DEFAULT);
            refreshProfileData(false);
          }}
        >
          Done
        </button>
      </div>
    </section>
  );
};

export default ManageProfiles;
