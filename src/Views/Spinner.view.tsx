/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {View, Spinner, Text} from '@shoutem/ui';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../Types/ComponentRoute';
interface Styles {
  container: ViewStyle;
  welcome: TextStyle;
  overlay: ViewStyle;
}

type SpinnerScreenRouteProp = RouteProp<RootStackParamList, 'Spinner'>;

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  // Flex to fill, position absolute,
  // Fixed left/top, and the width set to the window width
  overlay: {
    position: 'absolute',
    top: '20%',
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#fff',
    opacity: 0.3,
    height: '100%',
  },
});

interface Props {
  route: SpinnerScreenRouteProp;
}

const SpinnerScreen: React.FC<Props> = ({route}) => {
  // console.log(route.params);
  return (
    <View style={styles.container}>
      <Spinner style={{size: 'large'}} />
      <Text style={styles.welcome}>{route.params.message}</Text>
      <View style={styles.overlay} />
    </View>
  );
};

export default memo(SpinnerScreen);
