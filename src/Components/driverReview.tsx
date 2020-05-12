import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Button, View, Text} from '@shoutem/ui';
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const driverReview = ({driverInfo, onVerify}) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={{padding: '5%', fontSize: 20, fontWeight: 'bold'}}>
        Driver name : {driverInfo.username}
      </Text>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '5%',
        }}>
        <Button
          onPress={() => onVerify(driverInfo.username, true)}
          style={{width: '80%'}}
          styleName="secondary md-gutter-top">
          <Text>Verify Driver</Text>
        </Button>
        <Button
          onPress={() => onVerify(driverInfo.username, false)}
          style={{width: '80%', marginTop: '5%'}}
          styleName="secondary md-gutter-top">
          <Text>Delete Driver</Text>
        </Button>
      </View>
    </View>
  );
};

export default memo(driverReview);
