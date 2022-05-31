import axios from 'axios';
import Cookies from 'cookies';
import { refreshToken } from 'lib/auth';
import { TOKEN_KEY } from 'lib/constants';
import url from 'url';
const qs = require('query-string');

const handler = async (req, res) => {
  const cookies = new Cookies(req, res);
  const cookieToken = cookies.get(TOKEN_KEY);

  if (!cookieToken && !req.headers.referer.includes('register')) {
    res.redirect('/api/logout');
  } else {
    let currUser;
    // eslint-disable-next-line no-unused-vars
    const { host, cookie, ...headers } = req.headers;
    const h = Object.assign(headers, {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });

    if (!req.headers.referer.includes('register')) {
      currUser = cookieToken;
      h.Authorization = 'Bearer ' + currUser;
    }

    const options = {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      paramsSerializer: (params) => qs.stringify(params, { strict: true, sort: false }),
      method: req.method || 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: h
    };

    if (['post', 'put', 'patch', 'delete'].includes(req.method.toLowerCase())) {
      options['data'] = req.body || {}; // body data type must match "Content-Type" header
    }
    try {
      const parsedUrl = url.parse(req.url).path;
      const apiRelativeUrl = parsedUrl.replace(/^\/api\/data/, '');
      const apiPath = `${process.env.NEXT_PUBLIC_API_URL}${apiRelativeUrl}`;

      const result = await axios(apiPath, options);
      res.json(result.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { data, status } = error.response;
        if (status === 401) {
          await refreshToken(currUser);
          return handler(req, res);
        }
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
  }
};

export default handler;
