import React, { Component } from 'react';
import styles from '../Form-elements.module.scss';

export const Select = (props) => {
  // Получаем список для DataList
  const items = props.dataList;
  const listItems = items.map((item) => (
    <option value={item.title}>{item.title}</option>
  ));

  return (
    <div className={styles.form_elements}>
      <input
        className={styles.form_elements_input}
        type={props.type}
        list={props.idDataList}
        name={props.nameInput}
        placeholder=" "
        onChange={props.onChange}
      />
      <label className={styles.form_elements_label} list={props.idDataList}>{props.label}</label>
      <fieldset className={styles.form_elements_fieldset}>
        <legend>
          <span>{props.label}</span>
        </legend>
      </fieldset>

      <datalist id={props.idDataList}>{listItems}</datalist>
    </div>
  );
};
