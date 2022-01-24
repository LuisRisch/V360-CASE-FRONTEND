import styles from './user-card.module.css';

/* Required props 
 * --cardHeader; 
 * --cardFooter; 
 * --cardBody. */

function UserCard(props) {
  const CARD_HEADER = props.cardHeader || <> </>;
  const CARD_BODY = props.cardBody || <> </>;
  const CARD_FOOTER = props.cardFooter || <> </>;

  return (
    <div className={styles.card_container}>
      <div className={styles.card_header}>
        {CARD_HEADER}
      </div>
      <div className={styles.card_body}>
        {CARD_BODY}
      </div>
      <div className={styles.card_footer}>
        {CARD_FOOTER}
      </div>
    </div>
  )
}

export default UserCard
