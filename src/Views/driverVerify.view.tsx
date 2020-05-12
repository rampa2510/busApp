import React, {memo, useState, useEffect, useRef, useCallback} from 'react';
import {Screen} from '@shoutem/ui';
import interceptor from '../Services/interceptor';
import Header from '../Components/header';
import Spinner from './Spinner';
import EmptyScreen from './emptyScreen';
import {FlatList} from 'react-native';
import DriverInfo from '../Components/driverReview';

const DriverVerify = () => {
  const [isLoading, setLoading] = useState(true);
  const driversData = useRef(null);

  const onVerify = useCallback(async (username, verify) => {
    setLoading(true);
    const resp = await interceptor('driver', 'PATCH', {verify, username});
    console.log(resp);
    await getAllDrivers();
  }, []);
  const getAllDrivers = useCallback(async () => {
    setLoading(true);
    const resp = await interceptor('driver');
    console.log(resp);
    driversData.current = resp[1].drivers.filter(item => !item.verified);
    setLoading(false);
  }, []);
  useEffect(() => {
    (async () => {
      await getAllDrivers();
    })();
  }, []);
  if (isLoading) {
    return <Spinner message="Loading list..." />;
  }
  if (!driversData.current.length) {
    return (
      <>
        <Header title="Verify Drivers" />
        <EmptyScreen message="No new drivers" />
      </>
    );
  }
  return (
    <Screen>
      <Header title="Verify Drivers" />
      <FlatList
        data={driversData.current}
        renderItem={({item}) => (
          <DriverInfo driverInfo={item} onVerify={onVerify} />
        )}
        keyExtractor={item => item._id}
      />
    </Screen>
  );
};

export default memo(DriverVerify);
