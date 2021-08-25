import axios from 'axios';
import history from '../history';
import endpoints from '../consts/endpoints';
import { apiBase } from '../consts/config';
import UserSessionDataHandler from '../auth/UserSessionDataHandler';
import Auth from '../auth/Auth';

const UNAUTHORIZED = 401;
const PATH_TO_NOT_LOAD = '/localization';

axios.interceptors.request.use(
  (request) => {
    try {
      if (!request.url.includes(PATH_TO_NOT_LOAD))
        document.getElementById('main-loader').style.display = 'block';
    } catch (e) {
      console.log(e);
    }

    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    try {
      document.getElementById('main-loader').style.display = 'none';
    } catch (e) {
      console.log(e);
    }

    return response;
  },
  (error) => {
    document.getElementById('main-loader').style.display = 'none';
    const { status } = error.response;
    if (
      status === UNAUTHORIZED &&
      !error.response.config.url.includes('login')
    ) {
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
