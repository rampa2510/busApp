//========================================================================================
/*                                                                                      *
 *                           Import All essential dependencies                          *
 *                                                                                      */
//========================================================================================
import 'react-native-gesture-handler';
import React, {useReducer, useEffect, useMemo, memo} from 'react';
// const whyDidYouRender = require('@welldone-software/why-did-you-render');
// whyDidYouRender(React, {
//   trackAllPureComponents: true,
// });
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Alert} from 'react-native';
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                    Import all types and helper functions                             *
 *                                                                                      */
//========================================================================================
import {RootStackParamList, DrawerStackParamList} from './Types/ComponentRoute';
import {Utils, UserDataObj, ResponseObj} from './Types/UtilContext';
import mainReducer from './Services/userReduces';
import {getData, setData, removeData} from './Services/Storage';
import customInterceptor from './Services/interceptor';
import UtilContext from './Services/UtilContext';
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                Import all the screens                                *
 *                                                                                      */
//========================================================================================
import LoginScreen from './Containers/login.container';
import SpinnerScreen from './Views/Spinner.view';
import HomeScreen from './Containers/home.container';
import RegistrationScreen from './Containers/Register.container';
import FeedBack from './Views/Feedback.view';
import FeedBackList from './Views/FeedbackList.view';
import BusDetails from './Views/BusList.view';
//########################################################################################

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerStackParamList>();

const MainDrawer: React.FC = ({route}) => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      {route.params.userType === 'user' ? (
        <Drawer.Screen name="Feedback" component={FeedBack} />
      ) : route.params.userType === 'admin' ? (
        <>
          <Drawer.Screen
            options={{title: 'Feedback List'}}
            name="FeedbackList"
            component={FeedBackList}
          />
          <Drawer.Screen
            options={{title: 'Bus List'}}
            name="buslist"
            component={BusDetails}
          />
        </>
      ) : null}
    </Drawer.Navigator>
  );
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(mainReducer, {
    isLoading: true,
    token: null,
    message: 'Starting app...',
  });

  useEffect(() => {
    (async () => {
      dispatch({type: 'Loader_On', message: 'Starting app...'});
      // await removeData('userData');

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
        const resp:
          | any[]
          | [number, ResponseObj]
          | null = await customInterceptor('login', 'POST', {
          username,
          password,
          type,
        });
        // if no error and request was successfull
        if (!resp) {
          return;
        }
        dispatch({type: 'Login', token: resp[1].data});
        dispatch({type: 'Loader_Off'});
        await setData('userData', JSON.stringify(resp[1].data));
      },
      signUp: async (username, password, type) => {
        dispatch({type: 'Loader_On', message: 'Signing Up..'});
        const resp:
          | any[]
          | [number, ResponseObj]
          | null = await customInterceptor('register', 'POST', {
          username,
          password,
          type,
        });
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
        if (resp[1].data.type !== 'driver') {
          await setData('userData', JSON.stringify(resp[1].data));
          dispatch({type: 'Login', token: resp[1].data});
        } else {
          Alert.alert(
            'Welocme',
            'Drivers need to be verified before logging in wait for confirmation',
          );
        }
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
  // console.log(state);
  return (
    <NavigationContainer>
      <UtilContext.Provider value={utils}>
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
            <Stack.Screen
              name="Home"
              initialParams={{
                userType: state.token.type,
                username: state.token.username,
              }}
              component={MainDrawer}
            />
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegistrationScreen} />
            </>
          )}
        </Stack.Navigator>
      </UtilContext.Provider>
    </NavigationContainer>
  );
};

export default memo(App);
