import { map } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { isRight } from 'fp-ts/lib/Either';
import { type ParsedUrlQuery } from 'querystring';
import { type GetStaticProps, type GetStaticPaths } from 'next';
import {
  getFileNames,
  getTranslationFolderPath,
  readFileByPredicate,
} from '~/scripts/files';
import styles from '~/styles/Page.module.css';
import OpenGraph from '~/components/OpenGraph';
import Title from '~/components/Title';
import Description from '~/components/Description';
import Grid from '~/components/Grid';
import Footer from '~/components/Footer';

interface Params extends ParsedUrlQuery {
  slug: string,
}

interface Props {
  locale: string,
  translations: Record<string, string>,
}

const TranslatedPage = (props: Props) => {
  return (
    <div className={styles.container}>
      <OpenGraph />
      <main className={styles.main}>
        <Title />
        <Description />
        <Grid />
      </main>
      <Footer />
    </div>
  );
};

const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: pipe(
      getTranslationFolderPath(import.meta.url),
      getFileNames,
      map((fileName) => ({ params: { slug: fileName } })),
    ),
    fallback: false,
  };
};

const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const { params } = context;

  if (params?.slug) {
    const { slug } = params;
    const translations = readFileByPredicate(
      getTranslationFolderPath(import.meta.url),
      (filePath) => filePath.includes(slug),
    );

    if (isRight(translations)) {
      return {
        props: { locale: slug, translations: translations.right },
      };
    }

    throw new Error('Error: [locale].tsx translationData is left.');
  }

  throw new Error('Error: [locale].tsx params.slug is undefined.');
};

export { getStaticPaths, getStaticProps };
export default TranslatedPage;
