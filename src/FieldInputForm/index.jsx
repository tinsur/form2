import {startErrorTex} from "../Utils/const";
import styles from './index.module.css'

function FieldInputForm({name, placeholder,type, value, onChangeState, onBlurState, error}) {
    return (
        <div className={styles.inputWrap}>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(event) =>
                    onChangeState(name, event)
                }
                onBlur={(event) => {
                    if (typeof onBlurState === 'function') {
                        onBlurState(name, event)
                    }
                }
                }
                className={error[name] && error[name] !== startErrorTex ? `${styles.input} ${styles.inputError}` : styles.input}
            />
            {(error[name] && error[name] !== startErrorTex) &&
            <span className={styles.error}>{error[name]}</span>}
        </div>
    )

}

export default FieldInputForm;