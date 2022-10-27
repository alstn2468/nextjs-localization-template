import Head from 'next/head';
import { useTranslation } from '~/context/L10nContext';

function OpenGraph() {
  const t = useTranslation();
  return (
    <Head>
      <title>{t('og-title')}</title>
      <meta name="description" content={t('og-description')} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default OpenGraph;
