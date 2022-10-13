import React, {useState} from 'react';

import { MyTable } from '../../elements/Table/MyTable.jsx';

import styles from './Nomenclature.module.scss';




export const Nomenclature = () => {

  const [titleColumn, setTitleColumn] = useState([
    '№ п/п',
    'Склад',
    'Категория',
    'Наименование',
    's/n',
    'Количество',
    'Действия',
  ]);


  const [content, setContent] = useState({
    header:[],
    body:[],
  });

  return (
    <section className={styles.nomenclature_section}>
        <h2>Номенклатура</h2>
        <MyTable titleColumn={titleColumn}/>
    </section>
  );
};