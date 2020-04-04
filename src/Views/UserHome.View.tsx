import React, {memo} from 'react';
import {Screen, Text} from '@shoutem/ui';
import {BusDataType} from '../Types/EssentialData';
interface Props {
  allBusData: BusDataType[] | null;
}

const UserHome: React.FC<Props> = ({allBusData}) => {
  // console.log(allBusData);
  return (
    <Screen>
      <Text>User Home</Text>
    </Screen>
  );
};

export default memo(UserHome);
