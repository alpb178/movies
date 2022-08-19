import AreasForm from '@/containers/area/AreasForm';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const AreasFormCreatePage = () => {
  const router = useRouter();
  const areasId = router.query.slug;

  return <AreasForm areasId={areasId} />;
};

AreasFormCreatePage.layout = Admin;
AreasFormCreatePage.roles = [ROLE_ADMIN];

export default AreasFormCreatePage;
