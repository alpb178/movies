import { apiFetcher } from '@/lib/apiFetcher';
import {
  API_CHANGE_PASSWORD_URL,
  API_CONFIRM_SIGNUP_URL,
  API_CREATE_ACCOUNT_SIGNUP_URL,
  API_FACEBOOK_AUTH_URL,
  API_GOOGLE_AUTH_URL,
  API_RESET_PASSWORD_URL,
  API_SIGNUP_URL,
  POST
} from '@/lib/constants';
import { saveData } from '..';

export const signupUser = async (args) => {
  const { data: values, ...rest } = args;
  const { data } = await apiFetcher(API_SIGNUP_URL, { data: values, method: POST, rest });
  return data;
};

export const verifyUser = async (args) => {
  const { token, ...rest } = args;
  const { data } = await apiFetcher(API_CONFIRM_SIGNUP_URL, {
    data: { token },
    method: POST,
    rest
  });
  return data;
};

export const createAccount = async ({ args = {} } = {}) => {
  await saveData({ path: API_CREATE_ACCOUNT_SIGNUP_URL, data: args, method: POST });
};

export const signinWithFacebook = async (args) => {
  const { data } = args;
  return apiFetcher(API_FACEBOOK_AUTH_URL, { data, method: POST });
};

export const signinWithGoogle = async (args) => {
  const { data } = args;
  return apiFetcher(API_GOOGLE_AUTH_URL, { data, method: POST });
};

export const resetPassword = async (args) => {
  const { email } = args;
  const { data } = await apiFetcher(API_RESET_PASSWORD_URL, {
    data: { email },
    method: POST
  });
  return data;
};

export const changePassword = async (args) => {
  const { token, password } = args;
  const url = `${API_CHANGE_PASSWORD_URL}/${token}`;
  const { data } = await apiFetcher(url, { data: { password }, method: POST });
  return data;
};
