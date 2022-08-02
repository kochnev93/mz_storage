import React, { Component } from 'react';
import styles from '../Form-elements.module.scss';

export const MyInputSearch = (props) => {
  return (
    <div className={styles.form_elements}>
      <input
        className={styles.form_elements_input}
        type="search"
        name="filter_search"
        placeholder=" "
      />
      <label className={styles.form_elements_label}>Поиск</label>
      <fieldset className={styles.form_elements_fieldset}>
        <legend>
          <span>Поиск</span>
        </legend>
      </fieldset>
    </div>
  );
};
