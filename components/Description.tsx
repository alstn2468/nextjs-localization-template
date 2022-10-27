import { useTranslation } from '~/context/L10nContext';
import styles from '~/styles/Description.module.css';

function Description() {
  const t = useTranslation();
  return (
    <p className={styles.description}>
      {t('description')}{' '}
      <code className={styles.code}>{t('page-file-path')}</code>
    </p>
  );
}

export default Description;
