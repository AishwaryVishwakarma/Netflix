import React from 'react';
import styles from './styles.module.scss';
import {SCREEN_STATE} from '@/app/profiles/page';
import {getNextIcon} from '@/DATA/PROFILE_ICONS';
import {type UserProfileModel} from '@/types';

const AddProfile: React.FC<{
  profileData: UserProfileModel;
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
  refreshProfileData: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({profileData, changeScreen, refreshProfileData}) => {
  const {
    meta: {_index},
  } = profileData ?? {};

  const [profilename, setProfileName] = React.useState<string>('');

  const [isSubmitClicked, setIsSubmitClicked] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string>('');

  const icon = getNextIcon(_index);

  function submitHandler() {
    if (!isSubmitClicked) setIsSubmitClicked(true);
    if (!profilename) {
      setError('Please enter a name');
      return;
    }
    refreshProfileData(true);
  }

  const isError = isSubmitClicked && error && !profilename;

  return (
    <section className={styles.addProfileWrapper}>
      <div>
        <h1>Add Profile</h1>
        <h5>Add a profile for another person watching Netflix.</h5>
        <div className={styles.profileEntry}>
          <img src={icon} alt='profile-icon' />
          <form onSubmit={submitHandler}>
            <input
              className={isError ? styles.errorInput : ''}
              id='add-profile-name'
              name='addProfileName'
              type='text'
              placeholder='Name'
              value={profilename}
              onChange={(e): void => setProfileName(e.target.value)}
            />
            {isError && <p>{error}</p>}
          </form>
        </div>
        <div className={styles.controls}>
          <button
            data-button-disabled={profilename ? false : true}
            className={styles.continueButton}
            type='button'
            onClick={submitHandler}
          >
            Continue
          </button>
          <button
            className={styles.cancelButton}
            type='button'
            onClick={() => {
              changeScreen(SCREEN_STATE.DEFAULT);
              refreshProfileData(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddProfile;
