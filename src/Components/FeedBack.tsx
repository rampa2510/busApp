import React from 'react';
import {Subtitle, View, Button, Text} from '@shoutem/ui';
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

const FeedBack = ({feedBack}) => {
  return (
    <View style={styles.containerStyle}>
      <Text
        style={{
          padding: '5%',
          fontSize: 16,
          fontWeight: 'bold',
          color: '#000',
        }}>
        Feedback By : {feedBack.username}
      </Text>
      <Text
        style={{
          padding: '5%',
          fontSize: 16,
          fontWeight: 'bold',
          color: '#000',
        }}>
        Feedback : {feedBack.feedback}
      </Text>
    </View>
  );
};

export default FeedBack;
