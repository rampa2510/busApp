import {getData} from './Storage';
import {ResponseObj} from '../Types/UtilContext';
import {Alert} from 'react-native';
const customInterceptor = async (
  endpoint: string,
  method = 'GET',
  body = {},
  contentType = 'application/json',
): Promise<any[] | [number, ResponseObj] | null> => {
  const token = await getData('token');
  // console.log(endpoint, method, contentType);
  body = contentType === 'application/json' ? JSON.stringify(body) : body;

  let reqOptions = {
    method,
    headers: {
      'content-Type': contentType,
      Authorization: `Bearer ${token}`,
    },
    body,
  };
  // delete user Auth header if userData is not present
  if (!token) {
    delete reqOptions.headers.Authorization;
  }

  // delete data body if body is not supplied
  if (contentType !== 'application/json') {
    delete reqOptions.headers['content-Type'];
  }

  if (!Object.keys(body).length || method.toLowerCase() === 'get') {
    // console.log('l');
    delete reqOptions.body;
  }
  // console.log(reqOptions);
  console.log(endpoint);
  // console.log(key.dev);
  // console.log(`https://3d073ac7.ngrok.io/${endpoint}`);
  try {
    const response: any[] | [number, ResponseObj] = await fetch(
      `https://busback.herokuapp.com/${endpoint}`,
      reqOptions,
    ).then(async res => {
      let status = res.status;
      let resp = await res.json();
      return [status, resp];
    });
    if (response[0] === 400) {
      Alert.alert('Invalid details', response[1].message);
      return null;
    }
    if (!response || response[0] !== 200) {
      Alert.alert('Error', 'We are experincing issues please try again');
      return null;
    }

    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'We are experincing issues please try again');

    return null;
  }
};

export default customInterceptor;
