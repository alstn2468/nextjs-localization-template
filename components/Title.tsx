import { useTranslation } from '~/context/L10nContext';
import styles from '~/styles/Title.module.css';

function Title() {
  const t = useTranslation();
  return (
    <h1
      className={styles.title}
      dangerouslySetInnerHTML={{ __html: t('title') }}
    >
    </h1>
  );
}

export default Title;
