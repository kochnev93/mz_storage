import React, {useState} from 'react';
import cx from 'classnames';
import styles from './myInput.module.scss';

function Input() {
 
  return (
    <div className={styles.myInput_wrapper}>

        <input
          className={ cx(styles.myInput_input) }
        />

        <label className={styles.myInput_label}>
         rrr
        </label>

        <fieldset className={styles.myInput_fieldset}>
            <legend>
            <span>rrr</span>
          </legend>
        </fieldset>

    </div>
  );
}

export default Input;