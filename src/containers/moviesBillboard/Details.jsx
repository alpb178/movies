import FormSidebarRight from '@/components/form/FormSidebarRight';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Details = ({ data, onOpen, open }) => {
  const { t } = useTranslation('common');

  const [list, setList] = useState([]);
  const [image, setImage] = useState(
    `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${data?.original?.backdrop_path}`
  );

  useEffect(() => {
    onOpen(true);
  });

  return (
    <FormSidebarRight open={open} onOpen={onOpen}>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="relative w-full mx-auto">
            <div className="absolute z-10 text-center text-gray-500">
              <div className="flex flex-col justify-between px-4 py-5 space-y-4 brecipe-gray-200 lg:space-x-4 lg:flex-row lg:space-y-0 border-y sm:px-8">
                <div className="space-y-4 font-medium text-gray-900">
                  <div className="flex-shrink-0">
                    <Image layout="intrinsic" width={350} height={350} src={image} alt="" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-500">
                      {t('form.common.label.name')}
                    </p>
                    <div className="mt-1 text-lg text-gray-900">{data?.original?.title}</div>
                  </div>

                  <div className="sm:col-span-1">
                    <p className="text-lg font-medium text-gray-500">
                      {t('form.common.label.overview')}
                    </p>
                    <dd className="mt-1 text-lg text-gray-900">
                      {data?.original?.overview || '-'}
                    </dd>
                  </div>

                  <div className="sm:col-span-1">
                    <p className="text-lg font-medium text-gray-500">
                      {t('form.common.label.popularity')}
                    </p>
                    <dd className="mt-1 text-lg text-gray-900">{data?.original?.popularity}</dd>
                  </div>

                  <div className="sm:col-span-1">
                    <p className="text-lg font-medium text-gray-500">
                      {t('form.common.label.votes')}
                    </p>
                    <dd className="mt-1 text-lg text-gray-900">{data?.original?.vote_count}</dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormSidebarRight>
  );
};

Details.defaultProps = {
  data: null,
  errors: null
};

Details.propTypes = {
  data: PropTypes.object,
  errors: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  touched: PropTypes.object,
  setLoading: PropTypes.func.isRequired
};

export default Details;
