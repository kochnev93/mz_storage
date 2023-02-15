import React from 'react';
import cx from 'classnames';
import styles from './MyInput.module.scss';

import { TbLock } from 'react-icons/Tb';

const MyInput = (props) => {
  return (
    <>
      <div className={styles.myInput}>
        <input
          className={styles.myInput_input}
          type={props.type}
          placeholder=" "
          onChange={(e) => {
            props.changeValue(e.target.value);
          }}
          value={props.value}
          disabled={props.disabled || false}
        />
        <label className={styles.myInput_label}>
          {props.title || 'Заголовок'}
        </label>
        <fieldset
          className={cx(styles.myInput_fieldset, {
            [styles.error]: !props.validation,
          })}
        >
          <legend>
            <span>{props.title || 'Заголовок'}</span>
          </legend>
        </fieldset>

        {props.disabled && (
          <button
            className={styles.disabled_button}
            disabled={true}
            title="Поле заблокировано"
          >
            <TbLock />
          </button>
        )}
      </div>

    </>
  );
};

export default MyInput;
