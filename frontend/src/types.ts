export interface UserModel {
  _id: string;
  __v: number;
  email: string;
  account_created_on: string;
  last_log_in: string;
  subscription: {
    type: string;
    value: string;
  };
}
