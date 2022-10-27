import { useTranslation } from '~/context/L10nContext';
import styles from '~/styles/Grid.module.css';

import Card from './Card';

const data = [
  {
    link: 'https://nextjs.org/docs',
    translationPrefix: 'documentation',
  },
  {
    link: 'https://nextjs.org/learn',
    translationPrefix: 'learn',
  },
  {
    link: 'https://github.com/vercel/next.js/tree/canary/examples',
    translationPrefix: 'examples',
  },
  {
    link: 'https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
    translationPrefix: 'deploy',
  },
];

function Grid() {
  const t = useTranslation();
  return (
    <div className={styles.grid}>
      {data.map(({ link, translationPrefix }, index) => (
        <Card
          key={index}
          link={link}
          title={t(`${translationPrefix}-title`)}
          description={t(`${translationPrefix}-description`)}
        />
      ))}
    </div>
  );
}

export default Grid;
