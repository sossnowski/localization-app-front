import axios from 'axios';
import history from '../history';
import endpoints from '../consts/endpoints';
import { apiBase } from '../consts/config';
import UserSessionDataHandler from '../auth/UserSessionDataHandler';
import Auth from '../auth/Auth';

const UNAUTHORIZED = 401;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === UNAUTHORIZED) {
      const auth = new Auth();
      auth.unauthenticate();
      history.push('/');
    }
    return Promise.reject(error);
  }
);

export const postRequest = async (endpoint, paramsObj = {}) => {
  try {
    return await axios.post(`${apiBase}/${endpoints[endpoint]}`, paramsObj);
  } catch (error) {
    return error;
  }
};
