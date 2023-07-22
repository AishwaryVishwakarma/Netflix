import React from 'react';
import styles from './styles.module.scss';
import {type UserProfileModel} from '@/types';
import {clearStorage} from '@/FUNCTIONS';
import {useRouter} from 'next/navigation';
import {SCREEN_STATE} from '@/app/ManageProfiles/page';
import {
  deleteProfile as DELETE_PROFILE_URL,
  updateProfile as UPDATE_PROFILE_URL,
} from '@/END_POINTS';
import axios from 'axios';
import Loader from '@/utils/loader/loader';
import Edit from '@/utils/icons/Edit';
import {BiArrowBack} from 'react-icons/bi';
import ICONS_ARRAY from '@/DATA/PROFILE_ICONS';
import {nanoid} from 'nanoid';

/*
 * Edit Profile Screen [contains 4 screens]
 */

const LOCAL_SCREEN_STATE = {
  DEFAULT: 'default',
  DELETE: 'delete',
  UPDATE_ICON: 'updateIcon',
  CONFIRM_UPDATE_ICON: 'confirmUpdateIcon',
};

type ProfileData = Omit<UserProfileModel['profiles'][0], 'meta'>;

// Parent Component props
interface ComponentProps {
  profileData: UserProfileModel['profiles'];
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
  refreshProfileData: React.Dispatch<React.SetStateAction<boolean>>;
  userProfileId: string;
}

interface DefaultScreenProps extends ComponentProps {
  stateData: ProfileData;
  setStateData: React.Dispatch<React.SetStateAction<ProfileData>>;
  authToken: string;
  changeLocalSreen: React.Dispatch<React.SetStateAction<string>>;
}

interface DeleteScreenProps extends ComponentProps {
  authToken: string;
  changeLocalSreen: React.Dispatch<React.SetStateAction<string>>;
}

interface UpdateIconScreenProps {
  profileData: UserProfileModel['profiles'];
  changeLocalSreen: React.Dispatch<React.SetStateAction<string>>;
  changeIconState: React.Dispatch<
    React.SetStateAction<{
      original: string;
      updated: string;
    }>
  >;
}

const EditProfile: React.FC<ComponentProps> = ({
  profileData,
  changeScreen,
  refreshProfileData,
  userProfileId,
}) => {
  const {
    _id,
    name,
    icon,
    game_handle,
    autoplay_next_episode,
    autoplay_previews,
  } = profileData[0] ?? {};

  const authToken = localStorage.getItem('auth-token');

  const router = useRouter();

  const [data, setData] = React.useState<ProfileData>({
    _id,
    name,
    icon,
    game_handle: game_handle || '',
    autoplay_next_episode,
    autoplay_previews,
  });

  const [localScreenState, setLocalScreenState] = React.useState<string>(
    LOCAL_SCREEN_STATE.DEFAULT
  );

  // Using this state in order to retrieve both icons in confirmation state
  const [updateIconState, setUpdateIconState] = React.useState({
    original: icon,
    updated: '',
  });

  if (!authToken || !userProfileId) {
    clearStorage(['user-data', 'auth-token'], localStorage);
    router.push('/');
    return;
  }

  const deleteScreenProps = {
    authToken,
    userProfileId,
    profileData,
    changeScreen,
    refreshProfileData,
    changeLocalSreen: setLocalScreenState,
  };

  const defaultScreenProps = {
    ...deleteScreenProps,
    stateData: data,
    setStateData: setData,
  };

  return (
    <>
      {localScreenState === LOCAL_SCREEN_STATE.DEFAULT && (
        <Default {...defaultScreenProps} />
      )}
      {localScreenState === LOCAL_SCREEN_STATE.DELETE && (
        <Delete {...deleteScreenProps} />
      )}
      {localScreenState === LOCAL_SCREEN_STATE.UPDATE_ICON && (
        <UpdateIcon
          profileData={profileData}
          changeLocalSreen={setLocalScreenState}
          changeIconState={setUpdateIconState}
        />
      )}
      {localScreenState === LOCAL_SCREEN_STATE.CONFIRM_UPDATE_ICON && (
        <ConfirmChangeIcon />
      )}
    </>
  );
};

// Default Screen [ Has the form and all the controls ]
const Default: React.FC<DefaultScreenProps> = ({
  profileData,
  stateData: data,
  setStateData: setData,
  authToken,
  userProfileId: USER_PROFILE_ID,
  changeScreen,
  refreshProfileData,
  changeLocalSreen,
}) => {
  const {
    meta: {deletable},
    name,
    icon,
  } = profileData[0] ?? {};

  const [isGameHandleUnderFocus, setIsGameHandleUnderFocus] =
    React.useState<boolean>(false);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Using ref to focus on the input when the component is loaded
  const nameInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // Handle Profile data changes
  const handleDataChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const {name, value, type, checked} = event.target;
    setData((prev): ProfileData => {
      if (type === 'checkbox') {
        return {
          ...prev,
          [name]: checked,
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Fired when the User clicks on Save button
  const saveProfileHandler = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    nameInputRef.current?.blur();
    setIsLoading(true);
    try {
      const res = await axios.put(
        UPDATE_PROFILE_URL + USER_PROFILE_ID,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (res.status === 200) {
        refreshProfileData(true);
        changeScreen(SCREEN_STATE.DEFAULT);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <section className={styles.editProfileWrapper}>
      {isLoading && (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      )}
      {/* Changing the tabIndex when it's loading in order to prevent navigation through tab */}
      <div className={styles.main} tabIndex={isLoading ? -1 : 0}>
        <h1>Edit Profile</h1>
        <div className={styles.profileEntry}>
          <div>
            <img src={icon} alt={name} />
            <span
              onClick={(): void =>
                changeLocalSreen(LOCAL_SCREEN_STATE.UPDATE_ICON)
              }
            >
              <Edit />
            </span>
          </div>
          <form onSubmit={saveProfileHandler}>
            <input
              ref={nameInputRef}
              data-error={data.name.length === 0}
              type='text'
              value={data.name}
              id='name'
              name='name'
              required
              onChange={handleDataChange}
            />
            {data.name.length === 0 && (
              <p className={styles.error}>Please enter a name</p>
            )}
            <div className={styles.gameHandle}>
              <label htmlFor='game_handle'>Game Handle:</label>
              <p>
                Your handle is a unique name that&apos;ll be used for playing
                with other Netflix members across all Netflix Games.
              </p>
              <input
                type='text'
                value={data.game_handle}
                onFocus={(): void => setIsGameHandleUnderFocus(true)}
                id='game_handle'
                name='game_handle'
                placeholder='Create Game Handle'
                onChange={handleDataChange}
              />
              {isGameHandleUnderFocus && <p>{data.game_handle?.length}/16</p>}
            </div>
            <div className={styles.autoplayControls}>
              <h4>Autoplay controls</h4>
              <span>
                <input
                  type='checkbox'
                  name='autoplay_next_episode'
                  id='autoplay_next_episode'
                  checked={data.autoplay_next_episode}
                  onChange={handleDataChange}
                />
                <label htmlFor='autoplay_next_episode'>
                  Autoplay next episode in a series on all devices.
                </label>
              </span>
              <span>
                <input
                  type='checkbox'
                  name='autoplay_previews'
                  id='autoplay_previews'
                  checked={data.autoplay_previews}
                  onChange={handleDataChange}
                />
                <label htmlFor='autoplay_previews'>
                  Autoplay previews while browsing on all devices.
                </label>
              </span>
            </div>
            {/* Hiding the submit button in order to submit the form by using enter key */}
            <button className={styles.hidden} type='submit'></button>
          </form>
        </div>
        <div className={styles.controls}>
          <button
            type='submit'
            onClick={(e) => {
              saveProfileHandler(e);
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              changeScreen(SCREEN_STATE.DEFAULT);
              refreshProfileData(false);
            }}
          >
            Cancel
          </button>
          {deletable && (
            <button onClick={() => changeLocalSreen(LOCAL_SCREEN_STATE.DELETE)}>
              Delete Profile
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

// Update Icon Screen
const UpdateIcon: React.FC<UpdateIconScreenProps> = ({
  profileData,
  changeLocalSreen,
  changeIconState,
}) => {
  const {name, icon} = profileData[0] ?? {};
  return (
    <section className={styles.updateProfileWrapper}>
      <div className={styles.main}>
        <span className={styles.topBar}>
          <button
            role='button'
            type='button'
            onClick={(): void => changeLocalSreen(LOCAL_SCREEN_STATE.DEFAULT)}
          >
            <BiArrowBack />
          </button>
          <div>
            <h2>Edit Profile</h2>
            <h4>Choose a profile icon.</h4>
          </div>
          <div className={styles.profileDetail}>
            <h3>{name}</h3>
            <img src={icon} alt='' />
          </div>
        </span>
        <div className={styles.iconsContainer}>
          <ul>
            {ICONS_ARRAY.map((icon) => (
              <li
                key={nanoid()}
                // Setting the current icon to the parent state object in order to retireve both icons in confirmation screen
                onClick={() =>
                  changeIconState((prev) => {
                    return {
                      ...prev,
                      updated: icon,
                    };
                  })
                }
              >
                <img src={icon} alt='' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// Icon Change Confirmation Screen
const ConfirmChangeIcon: React.FC = () => {
  return <div>ihewf</div>;
};

// Delete Profile Screen
const Delete: React.FC<DeleteScreenProps> = ({
  profileData,
  authToken,
  userProfileId: USER_PROFILE_ID,
  changeScreen,
  refreshProfileData,
  changeLocalSreen,
}) => {
  const {_id, name, icon} = profileData[0] ?? {};

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const deleteProfileHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(DELETE_PROFILE_URL + USER_PROFILE_ID, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          _id,
        },
      });
      if (res.status === 200) {
        refreshProfileData(true);
        changeScreen(SCREEN_STATE.DEFAULT);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.deleteProfileWrapper}>
      {isLoading && (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      )}
      <div className={styles.main}>
        <h1>Delete Profile?</h1>
        <div className={styles.profileEntry}>
          <div>
            <img src={icon} alt='' />
            <p>{name}</p>
          </div>
          <h3>
            This profile&apos;s history - including My List , ratings and
            activity - will be gone forever, and you won&apos;t be able to
            access it again
          </h3>
        </div>
        <div className={styles.controls}>
          <button
            onClick={(): void => changeLocalSreen(LOCAL_SCREEN_STATE.DEFAULT)}
          >
            Keep Profile
          </button>
          <button onClick={deleteProfileHandler}>Delete Profile</button>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
