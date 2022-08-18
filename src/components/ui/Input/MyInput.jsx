import React from 'react';
import cx from 'classnames';
import styles from './MyInput.module.scss';

 const MyInput = (props) => {
  return (
    <div className={styles.myInput}>
      <input
        className={styles.myInput_input}
        type={props.type}
        placeholder=" "
        onChange={(e) => {props.changeValue(e.target.value)}}
        value = {props.value}
      />
      <label className={styles.myInput_label}>{props.title}</label>
      <fieldset className={ cx(styles.myInput_fieldset, {[styles.error]: !props.validation}) }>
        <legend>
          <span>{props.title}</span>
        </legend>
      </fieldset>
    </div>
  );
};

export default MyInput;
