import React from 'react';
import Cookies from 'cookies';
import jwt_decode from 'jwt-decode';
import dynamic from 'next/dynamic';
import { TOKEN_KEY } from 'lib/constants';
import { getHomePageFromUser } from 'lib/utils';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const Home = () => {
  return (
    <section className="flex flex-1 section lg:items-stretch">
      <div className="flex items-center justify-center w-full space-x-2 container-fluid">HOME</div>
    </section>
  );
};

export async function getServerSideProps({ req, res }) {
  let destination = '/login';

  const cookies = new Cookies(req, res);
  const accessToken = cookies.get(TOKEN_KEY);

  if (accessToken) {
    const newToken = JSON.parse(accessToken);
    const { exp, ...userData } = jwt_decode(newToken[TOKEN_KEY]);
    const currDate = new Date().getTime();
    const duration = exp * 1000;
    if (currDate < duration) {
      console.log(userData)
      destination = getHomePageFromUser(userData);
    }
  }

  return {
    redirect: {
      destination,
      permanent: false
    }
  };
}

Home.layout = Admin;

export default Home;
