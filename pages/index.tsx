import { type GetStaticProps } from 'next';
import { getAllLocales } from '~/utils/localization';
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
  const locales = getAllLocales();
  return { props: { locales } };
};

export { getStaticProps };
export default Root;
