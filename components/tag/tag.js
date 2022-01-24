import styles from './tag.module.css';

/* Required props 
 * --priority. */

function Tag(props) {
  const PRIORITY = props.priority || "low";

  const handleColorPriority = () => {
    switch (PRIORITY) {
      case 'Baixa':
        return '#0047AB';
      case 'Média':
        return '#FF9800';
      case 'Alta':
        return '#F44336';
      default:
        return '#4CAF50';
    }
  }

  return (
    <div style={{ backgroundColor: handleColorPriority() }} className={styles.tag}>
      {PRIORITY}
    </div>
  );
}

export default Tag
