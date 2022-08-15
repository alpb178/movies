import { apiFetcher } from '@/lib/apiFetcher';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

const Axios = ({ children, params, criteria, ...props }) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let cancelToken = null;
  let fetchTimer;

  const queryParams = useMemo(() => {
    if (params) {
      clearTimeout(fetchTimer);
      return params;
    }
  }, [params]);

  useEffect(() => {
    fetchTimer = setTimeout(() => fetchData(queryParams), 300);

    return () => {
      clearTimeout(fetchTimer);
      if (cancelToken) {
        cancelToken();
      }
    };
  }, [params?.q]);

  const makeNetworkRequest = async (p) => {
    const { url } = props;
    const { q, ...rest } = p;
    const apiParams = { [criteria]: p.q, ...rest };
    const { data: res } = await apiFetcher(url, {
      params: apiParams,
      cancelToken: new axios.CancelToken((token) => {
        cancelToken = token;
      })
    });
    cancelToken = null;
    setData(res);
    setError(false);
    setLoading(false);
  };

  const fetchData = (p) => {
    if (cancelToken) {
      cancelToken();
    }

    setError(false);
    setLoading(true);
    makeNetworkRequest(p);
  };

  return children({
    data,
    loading,
    error,
    refetch: fetchData
  });
};

export default Axios;
