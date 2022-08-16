import ComandaDetails from '@/containers/comanda/ComandaDetails';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const ComandaDetailsPage = () => {
  const router = useRouter();
  const comandaId = router.query.slug;

  return <ComandaDetails comandaId={comandaId} />;
};

ComandaDetailsPage.propTypes = {
  user: PropTypes.object.isRequired
};

ComandaDetailsPage.layout = Admin;
ComandaDetailsPage.roles = [ROLE_ADMIN];

export default ComandaDetailsPage;
