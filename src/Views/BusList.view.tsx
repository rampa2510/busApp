import React, {memo, useState, useEffect, useCallback, useRef} from 'react';
import {Screen, Text} from '@shoutem/ui';
import interceptor from '../Services/interceptor';
import Spinner from './Spinner';
import Header from '../Components/header';
import {FlatList} from 'react-native';
import BusDetails from '../Components/BusDeatils';
const BusList = () => {
  const [isLoading, setLoading] = useState(true);
  const allBusesData = useRef(null);
  const getBuses = useCallback(async () => {
    setLoading(true);
    const resp = await interceptor('bus');
    allBusesData.current = resp[1].data;
    setLoading(false);
  }, []);
  useEffect(() => {
    (async () => {
      await getBuses();
    })();
  }, []);
  if (isLoading) {
    return <Spinner message="Loading buses" />;
  }
  return (
    <Screen>
      <Header title="Buses" />
      <FlatList
        data={allBusesData.current}
        renderItem={({item}) => <BusDetails busData={item} />}
        keyExtractor={item => item._id}
      />
    </Screen>
  );
};

export default memo(BusList);
