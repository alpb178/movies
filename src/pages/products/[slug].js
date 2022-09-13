import ProductsList from '@/containers/product/ProductsList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const ProductsPage = () => {
  const router = useRouter();
  const productId = router.query.slug;
  return <ProductsList productId={productId} />;
};

ProductsPage.layout = Admin;
ProductsPage.roles = [ROLE_ADMIN];

export default ProductsPage;
