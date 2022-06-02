import { APP_NAME } from '@/lib/constants';
import '@/styles/calendar.scss';
import { SessionProvider } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/globals.scss';
import 'styles/nprogress.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

NProgress.configure({ showSpinner: false });

const queryClient = new QueryClient();

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
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
        <title>{APP_NAME}</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <CookiesProvider>
            <Layout roles={Component?.roles}>
              <Component {...pageProps} />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                draggable={false}
                pauseOnVisibilityChange
                closeOnClick
                pauseOnHover
                theme="colored"
              />
            </Layout>
          </CookiesProvider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default App;
