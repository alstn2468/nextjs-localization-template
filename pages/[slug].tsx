import { map } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { isRight } from 'fp-ts/lib/Either';
import { type ParsedUrlQuery } from 'querystring';
import { type GetStaticProps, type GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import {
  getFileNames,
  getTranslationFolder,
  readFileByPredicate,
} from '~/scripts/files';
import { useTranslation } from '~/context/L10nContext';
import styles from '~/styles/Home.module.css';

interface Params extends ParsedUrlQuery {
  slug: string,
}

interface Props {
  locale: string,
  translations: Record<string, string>,
}

const TranslatedPage = (props: Props) => {
  const t = useTranslation();
  return (
    <div className={styles.container}>
      <Head>
        <title>{t('og-title')}</title>
        <meta name="description" content={t('og-description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: t('title') }}
        >
        </h1>

        <p className={styles.description}>
          {t('description')}{' '}
          <code className={styles.code}>{t('page-file-path')}</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>{t('documentation-title')} &rarr;</h2>
            <p>{t('documentation-description')}</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>{t('learn-title')} &rarr;</h2>
            <p>{t('learn-description')}</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>{t('examples-title')} &rarr;</h2>
            <p>{t('examples-description')}</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>{t('deploy-title')} &rarr;</h2>
            <p>{t('deploy-description')}</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('footer-powered-by')}{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: pipe(
      getTranslationFolder(import.meta.url),
      getFileNames,
      map((fileName) => ({ params: { slug: fileName } })),
    ),
    fallback: true,
  };
};

const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const { params } = context;

  if (params?.slug) {
    const { slug } = params;
    const translations = readFileByPredicate(
      getTranslationFolder(import.meta.url),
      (filePath) => filePath.includes(slug),
    );

    if (isRight(translations)) {
      return {
        props: { locale: slug, translations: translations.right },
      };
    }

    throw new Error('Error: [locale].tsx translationData is left.');
  }
  throw new Error('Error: [locale].tsx getStaticProps something wrong.');
};

export { getStaticPaths, getStaticProps };
export default TranslatedPage;
