export type UserType = 'user' | 'driver' | 'admin';

export type ResponseObj = {
  message: string;
  data?: any;
};
export type GeneralResponse = [number, ResponseObj];

export interface UserDataObj {
  _id?: string;
  type: UserType | string;
  username: string;
  password: string;
}
export type Utils = {
  userData: UserDataObj | null;
  startLoader: (message: string) => void;
  stopLoader: () => void;
  signIn: (username: string, password: string, type: UserType | string) => void;
  signUp: (username: string, password: string, type: UserType | string) => void;
  signOut: () => void;
};
