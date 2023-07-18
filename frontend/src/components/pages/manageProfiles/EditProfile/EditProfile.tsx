import React from 'react';
import styles from './styles.module.scss';
import {type UserProfileModel} from '@/types';
import {clearStorage} from '@/FUNCTIONS';
import {useRouter} from 'next/navigation';
import {SCREEN_STATE} from '@/app/ManageProfiles/page';

type ProfileData = Omit<UserProfileModel['profiles'][0], '_id' | 'meta'>;

const EditProfile: React.FC<{
  profileData: UserProfileModel['profiles'];
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
  refreshProfileData: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({profileData, changeScreen, refreshProfileData}) => {
  const {
    _id,
    meta: {deletable},
    name,
    icon,
    game_handle,
    autoplay_next_episode,
    autoplay_previews,
  } = profileData[0] ?? {};

  const router = useRouter();

  const [data, setData] = React.useState<ProfileData>({
    name,
    icon,
    game_handle: game_handle || '',
    autoplay_next_episode,
    autoplay_previews,
  });

  const [isGameHandleUnderFocus, setIsGameHandleUnderFocus] =
    React.useState<boolean>(false);

  // Using ref to focus on the input when the component is loaded
  const nameInputRef = React.useRef<HTMLInputElement>(null);

  const authToken = localStorage.getItem('auth-token');

  React.useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  if (!authToken) {
    clearStorage(['user-data', 'auth-token'], localStorage);
    router.push('/');
    return;
  }

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

  //Form submit handler
  const saveDatahandler = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const {name, icon, game_handle, autoplay_next_episode, autoplay_previews} =
      data;
    const body = {
      name,
      icon,
      game_handle,
      autoplay_next_episode,
      autoplay_previews,
    };
    console.log(body);
  };

  return (
    <section className={styles.editProfileWrapper}>
      <div>
        <h1>Edit Profile</h1>
        <div className={styles.profileEntry}>
          <img src={icon} alt={name} />
          <form onSubmit={saveDatahandler}>
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
                min={2}
                max={16}
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
                  required
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
                  required
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
              saveDatahandler(e);
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
          {deletable && <button>Delete Profile</button>}
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
