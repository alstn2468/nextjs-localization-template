import { Fragment } from 'react';
import { map } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { isRight } from 'fp-ts/lib/Either';
import { type ParsedUrlQuery } from 'querystring';
import { type GetStaticProps, type GetStaticPaths } from 'next';

import {
  getFileNames,
  getTranslationFolder,
  readFileByPredicate,
} from '../scripts/files';
import { useLocale, useTranslation } from '../context/L10nContext';

interface Params extends ParsedUrlQuery {
  slug: string,
}

interface Props {
  locale: string,
  translations: Record<string, string>,
}

const TranslatedPage = (props: Props) => {
  const t = useTranslation();
  console.log(props);
  return (
    <Fragment>{t('hello')}</Fragment>
  );
};

const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: pipe(
      getTranslationFolder(import.meta.url),
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
