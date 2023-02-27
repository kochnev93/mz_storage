import React from 'react';

// Styles
import styles from './Checkbox.module.scss';

const Checkbox = (props) => {
  return (
    <div className={styles.checkbox}>
      <input type="checkbox" id={props.id} onChange={ () => {props.onChange(!props.checked)} } checked={props.checked}/>
      <label>{props.title}</label>
    </div>
  );
};

export default Checkbox;
