import React, {memo, MutableRefObject, RefObject} from 'react';
import {Screen, Heading, TextInput, Button, Text, View} from '@shoutem/ui';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ViewStyle,
  TextStyle,
  Picker,
} from 'react-native';

interface Styles {
  container: ViewStyle;
  textInputStyle: TextStyle;
  buttonStyle: ViewStyle;
  dropDownContainer: ViewStyle;
  dropDownStyle: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 0.9,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: '20%',
  },
  textInputStyle: {
    width: '80%',
  },
  buttonStyle: {
    width: '80%',
  },
  dropDownStyle: {
    height: 50,
    width: 150,
  },
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
});
interface Props {
  username: MutableRefObject<string>;
  password: MutableRefObject<string>;
  userType: RefObject<Picker>;
  onSubmit: () => void;
  onRegisterClick: () => void;
  userOption: string[];
}

const Login: React.FC<Props> = ({
  username,
  password,
  onSubmit,
  onRegisterClick,
  userOption,
  userType,
}) => {
  return (
    <Screen>
      <KeyboardAvoidingView style={styles.container}>
        <Heading styleName="bold">BEST APP</Heading>
        <TextInput
          placeholder="Username"
          autoCompleteType="username"
          autoFocus={true}
          enablesReturnKeyAutomatically={true}
          keyboardType="default"
          ref={username}
          style={styles.textInputStyle}
        />
        <TextInput
          placeholder="Password"
          autoCompleteType="password"
          enablesReturnKeyAutomatically={true}
          keyboardType={'default'}
          secureTextEntry
          ref={password}
          style={styles.textInputStyle}
        />
        <View>
          <Picker
            selectedValue={userOption}
            style={styles.dropDownStyle}
            ref={userType}>
            {userOption.map(userOpt => (
              <Picker.Item label={userOpt} value={userOpt} />
            ))}
          </Picker>
        </View>
        <Button
          onPress={onSubmit}
          style={styles.buttonStyle}
          styleName="secondary">
          <Text>Login</Text>
        </Button>
        <Text>OR</Text>
        <Button
          onPress={onRegisterClick}
          style={styles.buttonStyle}
          styleName="secondary">
          <Text>Register</Text>
        </Button>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default memo(Login);
