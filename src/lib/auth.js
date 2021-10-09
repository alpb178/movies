import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { authFetcher } from './apiFetcher';
import { API_LOGIN_URL, API_REFRESH_TOKEN_URL, TOKEN_KEY } from './constants';

const loggedOutResponse = { isLoggedIn: false };

export const refreshToken = (currentToken) =>
  new Promise((resolve, reject) => {
    authFetcher(API_REFRESH_TOKEN_URL, { method: 'post', data: currentToken })
      .then(async (response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const logout = async () => {
  let path = '/api/logout';
  if (typeof window === 'undefined') {
    path = process.env.NEXT_HOST_URL + path;
  }
  await axios.get(path);
  return Promise.resolve(loggedOutResponse);
};

export const getTokenUser = async () => {
  let path = '/api/user';
  if (typeof window === 'undefined') {
    path = process.env.NEXT_HOST_URL + path;
  }
  const { data: currToken } = await axios.get(path);
  if (!currToken) {
    // if no user in cookies then the user must enter their credentials to proceed
    return Promise.resolve(loggedOutResponse);
  }
  // eslint-disable-next-line no-unused-vars
  const { exp, iat, nbf, iss, ...userData } = jwt_decode(currToken[TOKEN_KEY]);
  let user = userData;
  const currDate = new Date().getTime();
  const duration = exp * 1000;
  if (currDate > duration) {
    try {
      const newToken = await refreshToken(currToken);
      // eslint-disable-next-line no-unused-vars
      const { exp, iat, nbf, iss, ...userData } = jwt_decode(newToken[TOKEN_KEY]);
      user = userData;
    } catch (error) {
      return logout();
    }
  }
  return Promise.resolve({ isLoggedIn: true, ...user });
};

export const login = (username, password, rememberMe) => {
  const data = {
    username,
    password,
    rememberMe
  };

  return new Promise((resolve, reject) => {
    authFetcher(API_LOGIN_URL, { method: 'post', data })
      .then(() => {
        getTokenUser()
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
