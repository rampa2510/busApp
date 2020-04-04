import React, {useContext, useRef, memo} from 'react';
import {Screen, Text} from '@shoutem/ui';
import UtilContext from '../Services/UtilContext';
import {Utils} from '../Types/UtilContext';
import UserHome from './UserHome.container'
const Home : React.FC = () => {
  const utils = useRef<Utils>(useContext(UtilContext));
  // console.log("ll")
  if(utils.current?.userData?.type==='user') return <UserHome />
  
  return (
    <Screen>
      <Text>Hello</Text>
    </Screen>
  );
};

export default memo(Home);
