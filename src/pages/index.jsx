import Dashboard from '@/containers/dashboard';
import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const HomePage = () => {
  return (
    <section className="flex flex-1 section lg:items-stretch">
      <div className="flex items-center justify-center w-full space-x-2 container-fluid">
        <Dashboard />
      </div>
    </section>
  );
};

// export async function getServerSideProps({ req, res }) {
//   let destination = '/login';

//   const cookies = new Cookies(req, res);
//   const accessToken = cookies.get(TOKEN_KEY);

//   if (accessToken) {
//     const { exp, ...userData } = jwt_decode(accessToken);
//     const currDate = new Date().getTime();
//     const duration = exp * 1000;
//     if (currDate < duration) {
//       destination = getHomePageFromUser(userData);
//     }
//   }

//   return {
//     redirect: {
//       destination,
//       permanent: false
//     }
//   };
// }

HomePage.layout = Admin;

export default HomePage;
