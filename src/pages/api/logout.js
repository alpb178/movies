import { TOKEN_KEY } from 'lib/constants';
import Cookies from 'cookies';

const handler = async (req, res) => {
  const cookies = new Cookies(req, res);
  cookies.set(TOKEN_KEY);
  res.json({ data: null });
};

export default handler;
