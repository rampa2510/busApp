import React, {memo, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../Types/Stack';

import LoginView from '../Views/login.view';

type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenProp>();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const onSubmit = () => console.log('on submit');
  const onRegisterClick = () => navigation.navigate('Register');
  return (
    <LoginView
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
      onRegisterClick={onRegisterClick}
    />
  );
};

export default memo(Login);
