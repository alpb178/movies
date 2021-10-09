import { API_LOGIN_URL, API_REFRESH_TOKEN_URL, TOKEN_KEY } from 'lib/constants';
import axios from 'axios';
import Cookies from 'cookies';
import url from 'url';

const handler = async (req, res) => {
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

export default handler;
