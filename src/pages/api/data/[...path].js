import axios from 'axios';
import url from 'url';
const qs = require('query-string');

const handler = async (req, res) => {
  const { host, cookie, ...headers } = req.headers;
  const h = Object.assign(headers, {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });

  const options = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL_IMAGE,
    paramsSerializer: function (params) {
      params.distinct = true;
      return qs.stringify(params, { strict: true, sort: false });
    },
    method: req.method || 'GET'
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
      const { data, status } = error.response;
      res.status(status).json(data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
};

export default handler;
