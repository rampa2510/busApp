/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {Screen} from '@shoutem/ui';
import {FlatList} from 'react-native';
import Header from '../Components/header';
import SpinnerView from './Spinner';
import BusCard from '../Components/BusCard';
const UserHome: React.FC = ({allBusData, isLoading, getAllBuses}) => {
  if (!allBusData) {
    return <SpinnerView message="Loading buses" />;
  }
  // console.log(allBusData);
  return (
    <Screen>
      <Header title="Buses" />
      <FlatList
        data={allBusData}
        renderItem={({item}) => <BusCard busData={item} />}
        keyExtractor={item => item._id}
        refreshing={isLoading}
        onRefresh={getAllBuses}
      />
    </Screen>
  );
};

export default memo(UserHome);
