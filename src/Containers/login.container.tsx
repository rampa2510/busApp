import React, {memo, useRef} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../Types/Stack';

import LoginView from '../Views/login.view';
import {Picker} from 'react-native';

type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenProp>();
  const username = useRef<string>('');
  const password = useRef<string>('');
  const type = useRef<Picker>(null);
  const userOptions = ['driver', 'user', 'admin'];
  const onSubmit = () => console.log(type, password, username);
  const onRegisterClick = () => navigation.navigate('Register');
  return (
    <LoginView
      username={username}
      password={password}
      onSubmit={onSubmit}
      onRegisterClick={onRegisterClick}
      userOption={userOptions}
      userType={type}
    />
  );
};

export default memo(Login);
