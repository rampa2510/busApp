import {UserDataObj} from '../Types/UtilContext';
interface State {
  isLoading: boolean;
  message: string | null;
  token: UserDataObj | null;
}

type Actions =
  | {type: 'Login'; token: UserDataObj | null}
  | {type: 'Log_Out'}
  | {type: 'Restore_Token'; token: UserDataObj | null}
  | {type: 'Loader_On'; message: string}
  | {type: 'Loader_Off'};

const reducer = (prevState: State, action: Actions) => {
  switch (action.type) {
    case 'Login':
      return {
        ...prevState,
        token: action.token,
      };
    case 'Loader_On':
      return {
        ...prevState,
        isLoading: true,
        message: action.message,
      };
    case 'Loader_Off':
      return {
        ...prevState,
        isLoading: false,
      };
    case 'Restore_Token':
      return {
        ...prevState,
        token: action.token,
      };
    case 'Log_Out':
      return {
        ...prevState,
        token: null,
        // userType: null,
      };
  }
};

export default reducer;
