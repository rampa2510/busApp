import React, {memo, useCallback, useState, useContext} from 'react';
import {Screen, View, Text, Button, TextInput} from '@shoutem/ui';
import {StyleSheet} from 'react-native';
import interceptor from '../Services/interceptor';
import Header from '../Components/header';
import Spinner from './Spinner';
import UtilContext from '../Services/UtilContext';

const styles = StyleSheet.create({
  container: {
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginLeft: '5%',
  },
  inputField: {
    width: '80%',
    height: 120,
    backgroundColor: '#fff',
    // borderRadius: 50,
    padding: '4%',
  },
  buttonStyle: {
    width: '80%',
    marginTop: '10%',
  },
});
const Feedback = () => {
  const [text, setText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const utils = useContext(UtilContext);
  const onSubmit = useCallback(async () => {
    setLoading(true);
    const resp = await interceptor('feedback', 'POST', {
      username:utils?.userData?.username,
      feedback: text,
    });
    setText('');
    setLoading(false);

    console.log(resp);
  }, [text]);


  if (isLoading) {
    return <Spinner message="Submitting feedback" />;
  }
  return (
    <Screen>
      <Header title="FeedBack" />
      <View style={styles.container}>
        <Text style={{marginTop: '10%', marginBottom: '10%'}}>
          Please give us your feedback if any
        </Text>
        <TextInput
          placeholder={'Feedback'}
          autoFocus={true}
          enablesReturnKeyAutomatically={true}
          keyboardType={'default'}
          multiline={true}
          style={styles.inputField}
          value={text}
          onChangeText={setText}
        />
        <Button
          onPress={onSubmit}
          style={styles.buttonStyle}
          styleName="secondary">
          <Text>Submit Feedback</Text>
        </Button>
      </View>
    </Screen>
  );
};

export default memo(Feedback);
