import React, {memo} from 'react';
import {View, Text} from 'react-native';
import Header from '../Components/header';
const Driver = () => {
  return (
    <View>
      <Header title="Buses" />
      <Text>Hello</Text>
    </View>
  );
};

export default memo(Driver);
