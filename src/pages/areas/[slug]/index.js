import AreaDetails from '@/containers/area/AreasDetails';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const AreaDetailsPage = () => {
  const router = useRouter();
  const areaId = router.query.slug;

  return <AreaDetails areaId={areaId} />;
};

AreaDetailsPage.propTypes = {
  user: PropTypes.object.isRequired
};

AreaDetailsPage.layout = Admin;
AreaDetailsPage.roles = [ROLE_ADMIN];

export default AreaDetailsPage;
