import React, {useContext, useRef, memo} from 'react';
import UtilContext from '../Services/UtilContext';
import {Utils} from '../Types/UtilContext';
import UserHome from './UserHome.container';
import DriverHome from './Driver.container';
import AdminScreen from '../Views/driverVerify.view'
const Home : React.FC = () => {
  const utils = useRef<Utils>(useContext(UtilContext));
  // console.log("ll")
  if(utils.current?.userData?.type==='user') return <UserHome />
  if(utils.current?.userData?.type==='driver') return <DriverHome />
  
  return <AdminScreen />
}

export default memo(Home);
