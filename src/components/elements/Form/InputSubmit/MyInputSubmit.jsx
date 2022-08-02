import React, { Component } from 'react';
import styles from '../Form-elements.module.scss';

export const MyInputSubmit = (props) => {
  return (
    <input className={styles.form_elements_input} type="submit" value="Найти" onClick={props.onClick} />
  );
};
