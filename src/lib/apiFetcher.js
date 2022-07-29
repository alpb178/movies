import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { isTokenExpired } from './utils';

const API_BASE_PATH = '/api/data';

export const apiFetcher = async (url, options = {}) => {
  const sanitizedUrl = url
    .split('/')
    .filter((v) => !!v)
    .join('/');

  const session = await getSession();
  const { headers = {}, ...config } = options;

  try {
    let path = API_BASE_PATH;
    if (typeof window === 'undefined') {
      path = process.env.NEXT_PUBLIC_HOST_URL + path;
    }

    if (session) {
      headers.Authorization = `Bearer ${session.accessToken}`;
    }

    const response = await axios(`${path}/${sanitizedUrl}`, {
      headers,
      ...config
    });

    if (response.data?.data === null) {
      response.data = null;
    }
    return response;
  } catch (error) {
    if (error?.response?.status === 401 || isTokenExpired(session)) {
      await signOut();
      throw new Error('Session expired');
    }
    throw error;
  }
};
