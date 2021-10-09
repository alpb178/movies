import React, { useEffect /*, useState*/ } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
// import { getScopes, getAllOffers, searchOffers, selectOffer, deleteOffer } from 'redux/actions';
import useTranslation from 'next-translate/useTranslation';
import { List } from 'immutable';

const offers = List([
  {
    number: '123',
    createdAt: 'asdasda',
    status: '',
    product: 'F000',
    description: 'dasdasd',
    amount: 1,
    price: '11000'
  },
  {
    number: '123',
    createdAt: 'asdasda',
    status: '',
    product: 'F000',
    description: 'dasdasd',
    amount: 1,
    price: '11000'
  }
]);

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const Offers = () => {
  const { t } = useTranslation('common');
  const listView = true;
  // const [listView, setListView] = useState(true);
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(20);

  useEffect(() => {}, []);

  // const onSearch = (values) => {
  // onSearchOffers(values.search);
  // };

  return (
    <>
      <div className="flex flex-col items-center"></div>
    </>
  );
};

Offers.propTypes = {
  // offers: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
  // onGetOffers: PropTypes.func.isRequired,
  // onSearchOffers: PropTypes.func.isRequired
};

const offerReducer = 'offer';

const mapStateToProps = (state) => ({
  loading: state.getIn([offerReducer, 'loading']),
  offers: state.getIn([offerReducer, 'offers']),
  filters: state.getIn([offerReducer, 'filters']),
  total: state.getIn([offerReducer, 'total'])
});

const mapDispatchToProps = () => ({});

Offers.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
