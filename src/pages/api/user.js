import { TOKEN_KEY } from 'lib/constants';
import Cookies from 'cookies';

const handler = async (req, res) => {
  const cookies = new Cookies(req, res);
  const cookieToken = cookies.get(TOKEN_KEY);
  const token = cookieToken ? JSON.parse(cookieToken) : null;
  res.json(token);
};

export default handler;
