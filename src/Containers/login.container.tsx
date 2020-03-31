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
  const [userType, setuserType] = useState('user');
  const userOptions = ['driver', 'user', 'admin'];
  const onSubmit = () => console.log(userType, password, username);
  const onRegisterClick = () => navigation.navigate('Register');
  return (
    <LoginView
      username={username}
      password={password}
      onSubmit={onSubmit}
      onRegisterClick={onRegisterClick}
      userOption={userOptions}
      userType={userType}
      setuserType={setuserType}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  );
};

export default memo(Login);
