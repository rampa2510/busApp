import React from 'react';
import {Subtitle, View, Text} from '@shoutem/ui';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  flexLy: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
});

const BusCard = ({busData}) => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.flexLy}>
        <Subtitle>From</Subtitle>
        <Subtitle>To</Subtitle>
      </View>
      <View style={styles.flexLy}>
        <Subtitle>{busData.start}</Subtitle>
        <Subtitle>{busData.end}</Subtitle>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
        }}>
        <Text>Bus number : {busData.number}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
        }}>
        <Text>No of seats booked : {busData.passengers.length}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
        }}>
        <Text>ETA : {busData.time}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
        }}>
        <Text>Price : {'\u20B9 ' + busData.price}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
        }}>
        <Text>
          {busData.reached
            ? `Reached : ${busData.reached}`
            : 'Not yet taken by a driver'}
        </Text>
      </View>
    </View>
  );
};

export default BusCard;
