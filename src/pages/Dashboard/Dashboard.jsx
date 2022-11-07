import React from 'react';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Table from '../../components/Table/Table.jsx';
import Header from '../../components/Header/Header.jsx';
import ModalAboutProduct from '../../components/ui/Modal/Modal-aboutProduct/MyModal-aboutProduct.jsx';
import ModalTransferProduct from '../../components/ui/Modal/Modal-transferProduct/MyModal-transferProduct.jsx';

import styles from '../style.module.scss';



export const Dashboard = () => {

  return (
    <section className={styles.main_section}>
      <ModalAboutProduct /> 
      <ModalTransferProduct/>
      <Header />
      <Navbar />
      <main className={styles.main}>
        <Table />
      </main>
    </section>
  );
};
