import styles from '~/styles/Card.module.css';

type Props = {
  title: string,
  description: string,
  link: string,
}

function Card(props: Props) {
  const { title, description, link } = props;
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={link}
      className={styles.card}
    >
      <h2>{title} &rarr;</h2>
      <p>{description}</p>
    </a>
  );
}

export default Card;
