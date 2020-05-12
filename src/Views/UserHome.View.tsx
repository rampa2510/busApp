/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {Screen} from '@shoutem/ui';
import {FlatList} from 'react-native';
import Header from '../Components/header';
import SpinnerView from './Spinner';
import BusCard from '../Components/BusCard';
import EmptyScreen from './emptyScreen';
const UserHome: React.FC = ({
  allBusData,
  isLoading,
  getAllBuses,
  bookBus,
  username,
}) => {
  if (!allBusData) {
    return <SpinnerView message="Loading buses" />;
  }
  if (!allBusData.length) {
    return (
      <>
        <Header title="Buses" />

        <EmptyScreen message="No buses to show" />
      </>
    );
  }
  return (
    <Screen>
      <Header title="Buses" />
      <FlatList
        data={allBusData}
        renderItem={({item}) => (
          <BusCard
            busData={item}
            bookBus={bookBus}
            number={item.number}
            username={username}
          />
        )}
        keyExtractor={item => item._id}
        refreshing={isLoading}
        onRefresh={getAllBuses}
      />
    </Screen>
  );
};

export default memo(UserHome);
