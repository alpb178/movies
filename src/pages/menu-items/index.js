import MenuItemsList from '@/containers/menu-items/MenuItemsList';
import { ROLE_ADMIN, ROLE_OWNER } from '@/lib/constants';
import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const MenuItemsPage = () => {
  return <MenuItemsList />;
};

MenuItemsPage.layout = Admin;
MenuItemsPage.roles = [ROLE_ADMIN, ROLE_OWNER];

export default MenuItemsPage;
