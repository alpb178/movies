import ProductsList from '@/containers/product/ProductsList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const ProductsPage = () => {
  return <ProductsList />;
};

ProductsPage.layout = Admin;
ProductsPage.roles = [ROLE_ADMIN];

export default ProductsPage;
