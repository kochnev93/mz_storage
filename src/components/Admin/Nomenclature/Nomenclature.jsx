import React from 'react';

import Table from '../../Table/Table.jsx';

import styles from './Nomenclature.module.scss';




export const Nomenclature = () => {

  return (
    <section className={styles.nomenclature_section}>
        <h2>Номенклатура</h2>
        <Table />
    </section>
  );
};