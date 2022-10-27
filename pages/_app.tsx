import '../styles/globals.css';
import type { AppProps } from 'next/app';

import Layout from '~/components/Layout';
import { type L10nContextType } from '~/context/L10nContext';

interface PageProps extends L10nContextType {

}

function App({ Component, pageProps }: AppProps<PageProps>) {
  const { locale, translations, ...rest } = pageProps;
  return (
    <Layout locale={locale} translations={translations}>
      <Component {...rest} />
    </Layout>
  );
}

export default App;
