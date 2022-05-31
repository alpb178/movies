import Cookies from 'cookies';
import { TOKEN_KEY } from 'lib/constants';

const handler = async (req, res) => {
  const cookies = new Cookies(req, res);
  const cookieToken = cookies.get(TOKEN_KEY);
  const token = cookieToken ? cookieToken : null;
  res.json(token);
};

export default handler;
