import React from 'react';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Header from '../../components/Header/Header.jsx';

import styles from '../style.module.scss';


export const Error = ({message}) => {

  return (
    <section className={styles.main_section}>
      <Header />
      <Navbar />
      <main className={styles.main}>
        <h3>Ошибка</h3>
        <p>{message}</p>
      </main>
    </section>
  );
};
