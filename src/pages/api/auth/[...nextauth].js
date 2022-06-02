import { API_LOGIN_URL, API_REFRESH_TOKEN_URL, POST, TOKEN_KEY } from '@/lib/constants';
import axios from 'axios';
import Cookies from 'cookies';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import url from 'url';

const providers = [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
      password: { label: 'Password', type: 'password' },
      rememberMe: { label: 'Remember me', type: 'password' }
    },
    async authorize(credentials, req) {
      const { username, password, rememberMe } = credentials;
      const data = { username, password, rememberMe };
      try {
        const options = { method: POST, data };
        const path = `${process.env.NEXT_PUBLIC_API_URL}${API_LOGIN_URL}`;
        const res = await axios(path, options);
        // If no error and we have user data, return it
        if (res.status === 200) {
          return res.data;
        }
        // Return null if user data could not be retrieved
        return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  })
];

const callbacks = {
  async signIn({ user, account }) {
    if (account.provider === 'credentials' && user) {
      return true;
    }

    return false;
  },

  async jwt({ token, user, account }) {
    if (account && user) {
      const { accessToken, ...rest } = user;
      return {
        ...rest,
        accessToken
      };
    }

    return token;
  },

  async session({ session, token }) {
    session.accessToken = token.accessToken;
    session.user = token.user;
    return session;
  }
};

const pages = {
  error: '/auth/error',
  signIn: '/auth/login'
};

const options = {
  providers,
  pages,
  callbacks
};

export default (req, res) => NextAuth(req, res, options);

// Deprecated
export const handler = async (req, res) => {
  const cookies = new Cookies(req, res);
  // eslint-disable-next-line no-unused-vars
  const { host, cookie, ...headers } = req.headers;
  const h = Object.assign(headers, {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });
  const options = {
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
    method: req.method || 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: h
  };
  if (['post', 'put', 'path', 'delete'].includes(req.method.toLowerCase())) {
    options['data'] = req.body || null; // body data type must match "Content-Type" header
  }
  try {
    const parsedUrl = url.parse(req.url).path;
    const apiRelativeUrl = parsedUrl.replace(/^\/api\/auth/, '');
    const apiPath = `${process.env.NEXT_PUBLIC_API_URL}${apiRelativeUrl}`;
    const result = await axios(apiPath, options);
    const isLoginOrRefresh =
      apiRelativeUrl.startsWith(API_LOGIN_URL) || apiRelativeUrl.startsWith(API_REFRESH_TOKEN_URL);

    if (isLoginOrRefresh) {
      cookies.set(TOKEN_KEY, JSON.stringify(result.data));
    }

    res.json(result.data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { data, status } = error.response;
      res.status(status).json(data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(error);
      res.status(500).json(error.message);
    }
  }
};
