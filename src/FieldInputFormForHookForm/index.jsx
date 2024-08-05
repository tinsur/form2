import styles from './index.module.css';

function FieldInputFormForHookForm(props) {
    let massegeErrors = props.massegeErrors[props.field];
    let rulesErrors = props.rulesErrors[props.field];
    return (
        <div className={styles.inputWrap}>
            <input
                type={props.type}
                placeholder={props.placeholder}
                {...props.register(props.field, rulesErrors)}
                className={massegeErrors ? `${styles.input} ${styles.inputError}` : styles.input}
            />
            {massegeErrors &&
            <span className={styles.error}>{massegeErrors}</span>}
        </div>
    )

}

export default FieldInputFormForHookForm;