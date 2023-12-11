import React from 'react';
import styles from './styles.module.scss';
import {SCREEN_STATE} from '@/app/profiles/types';
import {getNextIcon} from '@/DATA/PROFILE_ICONS';
import {type UserProfileModel} from '@/types';
import {createProfile as CREATE_PROFILE_URL} from '@/END_POINTS';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import {clearStorage, getStorage} from '@/utils/storage';

/*
 * Add profile Screen
 */

const AddProfile: React.FC<{
  profileData: UserProfileModel;
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
  refreshProfileData: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({profileData, changeScreen, refreshProfileData}) => {
  const {
    meta: {_index},
  } = profileData ?? {};
  const router = useRouter();

  // Using ref to focus on the input when the component is loaded
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [profilename, setProfileName] = React.useState<string>('');

  const [isSubmitClicked, setIsSubmitClicked] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string>('');

  const icon = getNextIcon(_index);

  const [authToken] = getStorage(['auth-token'], localStorage);

  React.useEffect((): void => {
    // Focusing the input element when the component is rendered
    inputRef.current?.focus();
  }, []);

  if (!authToken) {
    clearStorage(['user-data', 'auth-token'], localStorage);
    router.push('/');
    return;
  }

  // Create profile handler
  async function submitHandler(
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    event.preventDefault();
    if (!isSubmitClicked) setIsSubmitClicked(true);
    if (!profilename) {
      setError('Please enter a name');
      return;
    }
    refreshProfileData(true);
    try {
      const res = await axios.post(
        CREATE_PROFILE_URL,
        {
          name: profilename.trim(),
          icon,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (res.status === 201) changeScreen(SCREEN_STATE.DEFAULT);
    } catch (error) {
      console.debug(error);
      clearStorage(['auth-token', 'user-data'], localStorage);
      router.push('/');
    }
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
              ref={inputRef}
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
            onClick={(): void => {
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
