import List from '@/containers/moviesPopular/List';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const ListPage = () => {
  return <List />;
};

ListPage.layout = Admin;
ListPage.roles = [ROLE_ADMIN];

export default ListPage;
