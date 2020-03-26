import {getData} from './Storage';
import {GeneralResponse, ResponseObj} from '../Types/UtilContext';
const customInterceptor = async (
  endpoint: string,
  method = 'GET',
  body = {},
  contentType = 'application/json',
): Promise<GeneralResponse | null> => {
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

  // console.log(key.dev);
  try {
    const response: GeneralResponse = await fetch(
      `http://localhost:4000/${endpoint}`,
      reqOptions,
    ).then(async res => {
      let status: number = res.status;
      let resp: ResponseObj = await res.json();
      return [status, resp];
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default customInterceptor;
