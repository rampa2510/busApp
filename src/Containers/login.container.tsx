import React, {memo, useState, useContext} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../Types/ComponentRoute';
import LoginView from '../Views/login.view';
import UtilContext from '../Services/UtilContext';
type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
  const utils = useContext(UtilContext);
  // console.log(utils);
  const navigation = useNavigation<LoginScreenProp>();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userType, setuserType] = useState<React.ReactText>('user');
  const userOptions = ['driver', 'user', 'admin'];
  // console.log(userType, username, password);
  const onSubmit = () => utils?.signIn(username, password, userType.toString());
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
