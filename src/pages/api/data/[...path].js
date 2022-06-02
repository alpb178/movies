// import { refreshToken } from '@/lib/auth';
import axios from 'axios';
import url from 'url';
const qs = require('query-string');

const handler = async (req, res) => {
  const { host, cookie, ...headers } = req.headers;

  if (!headers?.authorization && headers.referer.match(/auth/gi) === null) {
    res.redirect('/api/logout');
  }

  const options = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    paramsSerializer: function (params) {
      params.distinct = true;
      return qs.stringify(params, { strict: true, sort: false });
    },
    method: req.method || 'GET', // *GET, POST, PUT, DELETE, etc.
    headers
  };

  if (['post', 'put', 'patch', 'delete'].includes(req.method.toLowerCase())) {
    options['data'] = req.body || null; // body data type must match "Content-Type" header
  }

  try {
    const parsedUrl = url.parse(req.url).path;
    const apiRelativeUrl = parsedUrl.replace(/^\/api\/data/, '');
    const apiPath = `${process.env.NEXT_PUBLIC_API_URL}${apiRelativeUrl}`;
    const { data } = await axios(apiPath, options);

    res.json(data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { data, status } = error.response;
      // if (status === 401) {
      //   await refreshToken(currUser);
      //   return handler(req, res);
      // }
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
  // }
};

export default handler;
