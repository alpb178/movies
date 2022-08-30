import ShiftDetails from '@/containers/shift/ShiftDetails';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const ShiftDetailsPage = () => {
  const router = useRouter();
  const shiftId = router.query.slug;

  return (
    <>
      <ShiftDetails shiftId={shiftId} />; {console.log(shiftId)}
    </>
  );
};

ShiftDetailsPage.propTypes = {
  user: PropTypes.object.isRequired
};

ShiftDetailsPage.layout = Admin;
ShiftDetailsPage.roles = [ROLE_ADMIN];

export default ShiftDetailsPage;
