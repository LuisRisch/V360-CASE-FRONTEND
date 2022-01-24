import styles from './text-input.module.css';

/* Required props 
 * --label; 
 * --placeholder;  
 * --type; 
 * --htmlFor; 
 * --id; 
 * --name; 
 * --value; 
 * --onChange. */

function TextInput(props) {
  const LABEL = props.label || "";
  const PLACEHOLDER = props.placeholder || "";
  const TYPE = props.type || "text";
  const HTML_FOR = props.htmlFor || "";
  const ID = props.id || "";
  const NAME = props.name || "";
  const VALUE = props.value || "";
  const ON_CHANGE = props.onChange || function () { };

  return (
    <>
      <label htmlFor={HTML_FOR} className={styles.label}>
        {LABEL}
      </label>
      <input
        type={TYPE}
        id={ID}
        name={NAME}
        placeholder={PLACEHOLDER}
        className={styles.input}
        value={VALUE}
        onChange={ON_CHANGE} />
    </>
  )
}

export default TextInput
