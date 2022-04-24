import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import React, { useEffect /*, useState*/ } from 'react';

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

Offers.layout = Admin;

export default Offers;
