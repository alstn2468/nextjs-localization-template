import { pipe } from 'fp-ts/lib/function';
import { type GetStaticProps } from 'next';
import {
  getFileNames,
  getTranslationFolderPath,
} from '~/scripts/files';
import useRedirectLocalePage from '~/hooks/useRedirectLocalePage';

type Props = {
  locales: string[];
}

function Root(props: Props) {
  const { locales } = props;
  useRedirectLocalePage(locales);
  return null;
}

const getStaticProps: GetStaticProps<Props> = async () => {
  const locales = pipe(
    getTranslationFolderPath(import.meta.url),
    getFileNames,
  );
  return { props: { locales } };
};

export { getStaticProps };
export default Root;
