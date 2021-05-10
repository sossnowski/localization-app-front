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
      Auth.unauthenticate();
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

export const authGetRequest = async (endpoint, paramsObj = {}) => {
  const token = UserSessionDataHandler.getToken();
  console.log(paramsObj);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: paramsObj,
  };
  try {
    return await axios.get(`${apiBase}/${endpoints[endpoint]}`, config);
  } catch (error) {
    return error;
  }
};

export const authGetRequestWithParams = async (endpoint, paramsObj = {}) => {
  const token = UserSessionDataHandler.getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let params = '';
  for (const value of Object.values(paramsObj)) {
    params += `/${value}`;
  }
  try {
    return await axios.get(
      `${apiBase}/${endpoints[endpoint]}${params}`,
      config
    );
  } catch (error) {
    return error;
  }
};

export const authPatchRequest = async (endpoint, paramsObj = {}) => {
  const token = UserSessionDataHandler.getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return await axios.patch(
      `${apiBase}/${endpoints[endpoint]}`,
      paramsObj,
      config
    );
  } catch (error) {
    return error;
  }
};

export const authPatchRequestWithParams = async (
  endpoint,
  paramsObj = {},
  data = null
) => {
  const token = UserSessionDataHandler.getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let params = '';
  for (const value of Object.values(paramsObj)) {
    params += `/${value}`;
  }
  try {
    return await axios.patch(
      `${apiBase}/${endpoints[endpoint]}${params}`,
      data,
      config
    );
  } catch (error) {
    return error;
  }
};

export const authPostRequest = async (endpoint, paramsObj = {}) => {
  const token = UserSessionDataHandler.getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return await axios.post(
      `${apiBase}/${endpoints[endpoint]}`,
      paramsObj,
      config
    );
  } catch (error) {
    return error;
  }
};

export const authDeleteRequestWithParam = async (endpoint, uid) => {
  const token = UserSessionDataHandler.getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return await axios.delete(
      `${apiBase}/${endpoints[endpoint]}/${uid}`,
      config
    );
  } catch (error) {
    return error;
  }
};
