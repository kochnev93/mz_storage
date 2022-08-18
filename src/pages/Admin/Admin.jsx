import React, { useState } from 'react';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Header from '../../components/Header/Header.jsx';

import styles from '../style.module.scss';
import Modal from '../../components/ui/Modal/MyModal.jsx';

export const Admin = () => {
  const [modalWindow, setModalWindow] = useState(false);

  return (
    <section className={styles.main_section}>
      <Modal active={modalWindow} setActive={setModalWindow} />
      <Header title='Номенклатура'/>
      <Navbar />
      <main className={styles.main}>
        <h1>This is Admin</h1>
        <button onClick={() => setModalWindow(true)}>Modal</button>
      </main>
    </section>
  );
};
