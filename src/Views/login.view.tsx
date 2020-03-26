import React, {memo} from 'react';
import {Screen, Text} from '@shoutem/ui';

interface Props {
  username: string;
  password: string;
  setUsername: (usernameString: string) => void;
  setPassword: (passwordString: string) => void;
  onSubmit: () => void;
  onRegisterClick: () => void;
}

const Login: React.FC<Props> = ({
  username,
  password,
  setUsername,
  setPassword,
  onSubmit,
  onRegisterClick,
}) => {
  return (
    <Screen>
      <Text>Login</Text>
    </Screen>
  );
};

export default memo(Login);
