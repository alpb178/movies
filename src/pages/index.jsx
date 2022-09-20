import List from '@/containers/popularMovies/List';
import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const HomePage = () => {
  return (
    <section className="flex flex-1 section lg:items-stretch">
      <div className="flex items-center justify-center w-full space-x-2 container-fluid">
        <List />
      </div>
    </section>
  );
};

HomePage.layout = Admin;

export default HomePage;
