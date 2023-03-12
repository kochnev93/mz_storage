import React from 'react';

// Style 
import styles from '../style/styles.module.scss';

// Components
import Header from './Header/Header.jsx';
import Navbar from './Navbar/Navbar.jsx';


export const MainWrapper = ({header_title, title = 'Страница без названия', children}) => {
  return (
    <section className={styles.main_section}>
      <Header title={header_title}/>
      <Navbar />

      <main className={styles.main}>
        <h1>{title}</h1>
        {children}
      </main>

    </section>
  );
};