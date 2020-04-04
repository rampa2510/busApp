import React, {memo, useRef, useEffect, useState, useCallback} from 'react';
import UserView from '../Views/UserHome.View';
import {BusDataType} from '../Types/EssentialData';
import interceptor from '../Services/interceptor';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../Types/Stack';
type UserHomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const UserHome: React.FC = () => {
  const navigation = useNavigation<UserHomeScreenProp>();
  const BusData = useRef<BusDataType[] | null>(null);
  // console.log(BusData);
  const [isLoading, setLoading] = useState<boolean>(true);

  const getAllBuses = useCallback(async () => {
    setLoading(true);
    const response = await interceptor('bus');
    if (!response) {
      return;
    }
    const data = response[1].data;
    // console.log(data);
    BusData.current = data;
    setLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      await getAllBuses();
    })();
  }, []);

  if (isLoading) {
    navigation.navigate('Spinner', {message: 'Loading busses'});
  }

  return <UserView allBusData={BusData.current} />;
};

export default memo(UserHome);
