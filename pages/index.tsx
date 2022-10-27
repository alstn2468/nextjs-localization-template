import { pipe } from 'fp-ts/lib/function';
import {
  getFileNames,
  getTranslationFolderPath,
} from '~/scripts/files';
import { type GetStaticProps } from 'next';

type Props = {
  locales: string[];
}

function Root(props: Props) {
  console.log(props);
  return (
    'Redirect to localized page'
  );
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
