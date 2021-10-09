import axios from 'axios';

const API_BASE_PATH = '/api/data';
const AUTH_BASE_PATH = '/api/auth';

export const apiFetcher = async (url, options = {}) => {
  const sanitizedUrl = url
    .split('/')
    .filter((v) => !!v)
    .join('/');

  try {
    let path = API_BASE_PATH;
    if (typeof window === 'undefined') {
      path = process.env.NEXT_HOST_URL + path;
    }
    const response = await axios(`${path}/${sanitizedUrl}`, {
      ...options
    });
    if (response.data?.data === null) {
      response.data = null;
    }
    return response;
  } catch (error) {
    console.log(error.config);
    throw error;
  }
};

export const authFetcher = async (url, options = {}) => {
  const sanitizedUrl = url
    .split('/')
    .filter((v) => !!v)
    .join('/');
  try {
    let path = AUTH_BASE_PATH;
    if (typeof window === 'undefined') {
      path = process.env.NEXT_HOST_URL + path;
    }
    const response = await axios(`${path}/${sanitizedUrl}`, {
      ...options
    });
    return response;
  } catch (error) {
    console.error(error.config);
    throw error;
  }
};
