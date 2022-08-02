import React from 'react';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Header from '../../components/Header/Header.jsx';

import styles from '../style.module.scss';

export const Admin = () => {
  return (
    <section className={styles.main_section}>
      <Header />
      <Navbar />
      <main className={styles.main}>
        <h1>This is Admin</h1>
      </main>
    </section>
  );
};