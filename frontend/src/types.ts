// Used in login page

export interface UserModel {
  _id: string;
  __v: number;
  meta: {
    profile_id: string;
  };
  email: string;
  account_created_on: string;
  last_log_in: string;
  subscription: {
    type: string;
    value: string;
  };
}

// Used in profile page

export interface UserProfileModel {
  _id: string;
  __v: number;
  meta: {
    user_id: string;
    profile_creation_available: boolean;
    _index: number;
  };
  profiles: Array<{
    meta: {
      deletable: boolean;
      icons_history: Array<string>;
    };
    _id: string;
    icon: string;
    name: string;
    game_handle: string;
    autoplay_next_episode: boolean;
    autoplay_previews: boolean;
  }>;
}
