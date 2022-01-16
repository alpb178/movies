import 'styles/globals.css';
import '@/styles/calendar.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import NProgress from 'nprogress';
import wrapper from 'redux/configureStore';
import useTranslation from 'next-translate/useTranslation';

import 'react-toastify/dist/ReactToastify.css';
import 'styles/nprogress.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

NProgress.configure({ showSpinner: false });

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  const { lang } = useTranslation();
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  const queryClientRef = React.useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="Content-Language" content={lang} />
        <title>Backpackpool</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <Layout roles={Component?.roles}>
            <Component {...pageProps} />
            <ToastContainer autoClose={5000} hideProgressBar theme="colored" className="mt-16" />
          </Layout>
        </CookiesProvider>
      </QueryClientProvider>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default wrapper.withRedux(App);
