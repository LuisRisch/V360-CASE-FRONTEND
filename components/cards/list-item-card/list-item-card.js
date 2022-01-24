import styles from './list-item-card.module.css'

/* Required props 
 * --title; 
 * --description; 
 * --button. */

function ListItemCard(props) {
  const TITLE = props.title || "";
  const DESCRIPTION = props.description || "";
  const BUTTON = props.button || <></>;

  return (
    <div className={styles.card_container}>
      <div className={styles.card_header}>
        {TITLE}
      </div>
      <div className={styles.card_body}>
        {DESCRIPTION}
      </div>
      <div className={styles.card_footer}>
        {BUTTON}
      </div>
    </div>
  )
}

export default ListItemCard
