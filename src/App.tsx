//========================================================================================
/*                                                                                      *
 *                           Import All essential dependencies                          *
 *                                                                                      */
//========================================================================================
import 'react-native-gesture-handler';
import React, {useReducer, useEffect, useMemo, createContext} from 'react';
const whyDidYouRender = require('@welldone-software/why-did-you-render');
whyDidYouRender(React, {
  trackAllPureComponents: true,
});
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Alert} from 'react-native';
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                    Import all types and helper functions                             *
 *                                                                                      */
//========================================================================================
import {RootStackParamList} from './Types/Stack';
import {Utils, UserDataObj, GeneralResponse} from './Types/UtilContext';
import mainReducer from './Services/userReduces';
import {getData, setData, removeData} from './Services/Storage';
import customInterceptor from './Services/interceptor';
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                Import all the screens                                *
 *                                                                                      */
//========================================================================================
import LoginScreen from './Containers/login.container';
import SpinnerScreen from './Views/Spinner.view';
import HomeScreen from './Containers/home.container';
//########################################################################################

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [state, dispatch] = useReducer(mainReducer, {
    isLoading: true,
    token: null,
    message: 'Starting app...',
  });

  useEffect(() => {
    (async () => {
      dispatch({type: 'Loader_On', message: 'Starting app...'});
      const userDataString = await getData('userData');
      if (!userDataString) {
        dispatch({type: 'Log_Out'});
      } else {
        const token: UserDataObj = JSON.parse(userDataString);
        dispatch({type: 'Restore_Token', token});
      }
      dispatch({type: 'Loader_Off'});
    })();
  }, []);

  const utils = useMemo(
    (): Utils => ({
      userData: state.token,
      startLoader: message => dispatch({type: 'Loader_On', message: message}),
      stopLoader: () => dispatch({type: 'Loader_Off'}),
      signIn: async (username, password, type) => {
        dispatch({type: 'Loader_On', message: 'Logging in..'});
        const resp: GeneralResponse | null = await customInterceptor(
          'login',
          'POST',
          {
            username,
            password,
            type,
          },
        );
        // if no error and request was successfull
        if (!resp || (resp[0] !== 200 && resp[0] !== 400)) {
          return Alert.alert(
            'Error',
            'We are experincing issues please try again',
          );
        }
        if (resp[0] === 400) {
          return Alert.alert('Invalid details', resp[1].message);
        }
        await setData('userData', JSON.stringify(resp[1].data));
        dispatch({type: 'Loader_Off'});
      },
      signUp: async (username, password, type) => {
        dispatch({type: 'Loader_On', message: 'Signing Up..'});
        const resp: GeneralResponse | null = await customInterceptor(
          'register',
          'POST',
          {
            username,
            password,
            type,
          },
        );
        // if no error and request was successfull
        if (!resp || (resp[0] !== 200 && resp[0] !== 400)) {
          return Alert.alert(
            'Error',
            'We are experincing issues please try again',
          );
        }
        if (resp[0] === 400) {
          return Alert.alert('Invalid details', resp[1].message);
        }
        await setData('userData', JSON.stringify(resp[1].data));
        dispatch({type: 'Loader_Off'});
      },
      signOut: () => {
        Alert.alert('Log out?', 'Are you sure you want to cancel the action?', [
          {
            text: 'Log out',
            onPress: async () => {
              dispatch({type: 'Loader_On', message: 'Logging out...'});
              await removeData('userData');
              dispatch({type: 'Log_Out'});
              dispatch({type: 'Loader_Off'});
            },
          },
          {text: 'Cancel', style: 'cancel'},
        ]);
      },
    }),
    [state.token],
  );
  const UtilsContext = createContext<Utils>(utils);
  return (
    <NavigationContainer>
      <UtilsContext.Provider value={utils}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.isLoading ? (
            <Stack.Screen
              name="Spinner"
              component={SpinnerScreen}
              initialParams={{
                message: `${state.message}`,
              }}
            />
          ) : state.token ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </UtilsContext.Provider>
    </NavigationContainer>
  );
};

export default App;
