import { type GetStaticProps } from 'next';

function NotFoundPage() {
  return null;
}

const getStaticProps: GetStaticProps = async () => {
  return { redirect: { permanent: true, destination: '/' } };
};

export { getStaticProps };
export default NotFoundPage;
