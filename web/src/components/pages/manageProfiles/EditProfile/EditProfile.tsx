import React from 'react';
import styles from './styles.module.scss';
import {type UserProfileModel} from '@/types';
import {clearStorage, getStorage} from '@/utils/storage';
import {useRouter} from 'next/navigation';
import {SCREEN_STATE} from '@/app/manage-profiles/types';
import {
  deleteProfile as DELETE_PROFILE_URL,
  updateProfile as UPDATE_PROFILE_URL,
} from '@/END_POINTS';
import axios from 'axios';
import CircularLoader from '@/assets/loaders/CircularLoader/CircularLoader';
import Edit from '@/assets/icons/Edit';
import {BiArrowBack} from 'react-icons/bi';
import {AiOutlineRight} from 'react-icons/ai';
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
} as const;

interface IconState {
  current: string;
  new: string;
}

type ProfileData = Omit<UserProfileModel['profiles'][0], 'meta'>;

// Parent Component props
interface MainComponentProps {
  profileData: UserProfileModel['profiles'];
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
  refreshProfileData: React.Dispatch<React.SetStateAction<boolean>>;
  userProfileId: string;
}

interface DefaultScreenProps extends MainComponentProps {
  localProfileData: ProfileData;
  setLocalProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  authToken: string;
  changeLocalSreen: React.Dispatch<React.SetStateAction<string>>;
}

interface DeleteScreenProps extends MainComponentProps {
  authToken: string;
  changeLocalSreen: React.Dispatch<React.SetStateAction<string>>;
}

interface UpdateIconScreenProps {
  profileData: UserProfileModel['profiles'];
  changeLocalSreen: React.Dispatch<React.SetStateAction<string>>;
  changeIconState: React.Dispatch<React.SetStateAction<IconState>>;
}

interface ConfirmationScreenProps {
  icons: IconState;
  changeLocalSreen: React.Dispatch<React.SetStateAction<string>>;
  setLocalProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const EditProfile: React.FC<MainComponentProps> = ({
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

  const [authToken] = getStorage(['auth-token'], localStorage);

  const router = useRouter();

  // Local Profile Data
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
  const [iconState, setIconState] = React.useState<IconState>({
    current: icon,
    new: '',
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
    localProfileData: data,
    setLocalProfileData: setData,
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
          changeIconState={setIconState}
        />
      )}
      {localScreenState === LOCAL_SCREEN_STATE.CONFIRM_UPDATE_ICON && (
        <ConfirmChangeIcon
          setLocalProfileData={setData}
          icons={iconState}
          changeLocalSreen={setLocalScreenState}
        />
      )}
    </>
  );
};

// Default Screen [ Has the form and all the controls ]
const Default: React.FC<DefaultScreenProps> = ({
  profileData,
  localProfileData: data,
  setLocalProfileData: setData,
  authToken,
  userProfileId: USER_PROFILE_ID,
  changeScreen,
  refreshProfileData,
  changeLocalSreen,
}) => {
  const {
    meta: {deletable},
  } = profileData[0] ?? {};

  const {icon, name} = data ?? {};

  const [isGameHandleUnderFocus, setIsGameHandleUnderFocus] =
    React.useState<boolean>(false);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Using ref to focus on the input when the component is loaded
  const nameInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect((): void => {
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
      console.debug(error);
    }
  };

  return (
    <section className={styles.editProfileWrapper}>
      {isLoading && (
        <div className={styles.loaderWrapper}>
          <CircularLoader />
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

// Update Icon Screen [ Contains all the icons user can select from ]
const UpdateIcon: React.FC<UpdateIconScreenProps> = ({
  profileData,
  changeLocalSreen,
  changeIconState,
}) => {
  const {
    name,
    icon,
    meta: { icon_history },
  } = profileData[0] ?? {};

  // Setting the current icon to the parent state object in order to retireve both icons in confirmation screen
  const updateIconHandler = (icon: string): void => {
    changeIconState((prev): IconState => {
      return {
        ...prev,
        new: icon,
      };
    });
    changeLocalSreen(LOCAL_SCREEN_STATE.CONFIRM_UPDATE_ICON);
  };

  return (
    <section className={styles.updateIconWrapper}>
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
          {icon_history.length > 1 && (
            <>
              <p>History</p>
              <ul>
                {icon_history?.map((icon) => (
                  <li
                    key={nanoid()}
                    onClick={(): void => updateIconHandler(icon)}
                  >
                    <img src={icon} alt='' />
                  </li>
                ))}
              </ul>
            </>
          )}
          <p>Available</p>
          <ul>
            {ICONS_ARRAY?.map((icon) => (
              <li key={nanoid()} onClick={(): void => updateIconHandler(icon)}>
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
const ConfirmChangeIcon: React.FC<ConfirmationScreenProps> = ({
  icons,
  changeLocalSreen,
  setLocalProfileData,
}) => {
  const { current, new: newIcon } = icons ?? {};

  return (
    <section className={styles.confirmChangeIconWrapper}>
      <div className={styles.main}>
        <h1>Change profile icon?</h1>
        <div className={styles.iconsContainer}>
          <span>
            <img src={current} alt='' />
            <p>Current</p>
          </span>
          <AiOutlineRight />
          <span>
            <img src={newIcon} alt='' />
            <p>New</p>
          </span>
        </div>
        <div className={styles.controls}>
          <button
            onClick={(): void => {
              setLocalProfileData((prev): ProfileData => {
                return {
                  ...prev,
                  icon: newIcon,
                };
              });
              changeLocalSreen(LOCAL_SCREEN_STATE.DEFAULT);
            }}
          >
            Let&apos;s Do it
          </button>
          <button
            onClick={(): void => {
              changeLocalSreen(LOCAL_SCREEN_STATE.UPDATE_ICON);
            }}
          >
            Not yet
          </button>
        </div>
      </div>
    </section>
  );
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
  const router = useRouter();

  const { _id, name, icon } = profileData[0] ?? {};

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const deleteProfileHandler = async (): Promise<void> => {
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
      console.debug(error);
      clearStorage(['auth-token', 'user-data'], localStorage);
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.deleteProfileWrapper}>
      {isLoading && (
        <div className={styles.loaderWrapper}>
          <CircularLoader />
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
