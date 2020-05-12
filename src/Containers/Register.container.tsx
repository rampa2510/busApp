import React, {memo, useState, useContext} from 'react';
import RegistrationView from '../Views/registration.view';
import UtilContext from '../Services/UtilContext';

const Register: React.FC = () => {
  const utils = useContext(UtilContext);
  // console.log(utils);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userType, setuserType] = useState<React.ReactText>('user');
  const userOptions = ['driver', 'user'];
  // console.log(userType, username, password);
  const onSubmit = () => utils?.signUp(username, password, userType.toString());

  return (
    <RegistrationView
      username={username}
      password={password}
      onSubmit={onSubmit}
      userOption={userOptions}
      userType={userType}
      setuserType={setuserType}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  );
};

export default memo(Register);
