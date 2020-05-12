import React, {memo, useState} from 'react';
import {Text, TextInput, Screen, View, Button} from '@shoutem/ui';
import Header from '../Components/header';
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
  textInputStyle: {
    marginTop: '5%',
    backgroundColor: '#ddd',
  },
  flexLy: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  content: {
    padding: '10%',
  },
});

const BusDetails = ({busData, onSubmit}) => {
  const [text, setText] = useState('');
  return (
    <Screen>
      <Header title="Buses" />
      <View style={styles.containerStyle}>
        <View style={styles.content}>
          <Text>Bus Number: {busData.number} </Text>
          <Text>No of Passengers: {busData.passengers.length} </Text>
          <Text>End destination: {busData.end} </Text>
          <TextInput
            placeholder="Update position"
            autoFocus={true}
            enablesReturnKeyAutomatically={true}
            keyboardType="default"
            value={text}
            onChangeText={setText}
            style={styles.textInputStyle}
          />
          <Button
            onPress={() => {
              onSubmit(busData.number, text);
              setText('');
            }}
            style={{width: '80%', marginLeft: '10%'}}
            styleName="secondary md-gutter-top">
            <Text>Update Position</Text>
          </Button>
        </View>
      </View>
    </Screen>
  );
};

export default memo(BusDetails);
