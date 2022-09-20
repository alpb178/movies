import axios from 'axios';

const API_BASE_PATH = '/api/data';

export const apiFetcher = async (url, options = {}) => {
  const sanitizedUrl = url
    .split('/')
    .filter((v) => !!v)
    .join('/');

  const { ...config } = options;

  try {
    let path = API_BASE_PATH;
    if (typeof window === 'undefined') {
      path = process.env.NEXT_PUBLIC_API_URL + path;
    }

    const response = await axios(`${path}/${sanitizedUrl}`, {
      ...config
    });

    if (response.data === null) {
      response.data = null;
    }

    return response;
  } catch (error) {
    if (error?.response?.status === 401) {
      throw new Error('Session expired');
    }
    throw error;
  }
};
