import React, {memo} from 'react';
import {FlatList} from 'react-native';
import BusCard from '../Components/DriverBusCard';
import Header from '../Components/header';
const DriverHome = ({allBusData, bookBus}) => {
  console.log(allBusData);
  return (
    <>
      <Header title="Available buses" />
      <FlatList
        data={allBusData}
        renderItem={({item}) => <BusCard busData={item} accept={bookBus} />}
        keyExtractor={item => item._id}
      />
    </>
  );
};

export default memo(DriverHome);
