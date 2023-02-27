import React from 'react';

import Navbar from '../../components/Navbar/Navbar.jsx';
import DashboardTable from '../../components/DashboardTable/DashboardTable.jsx';
import Header from '../../components/Header/Header.jsx';
import ModalAboutProduct from '../../components/ui/Modal/Modal-aboutProduct/MyModal-aboutProduct.jsx';
import ModalTransferProduct from '../../components/ui/Modal/Modal-transferProduct/MyModal-transferProduct.jsx';
import ModalRateProduct from '../../components/ui/Modal/Modal-rateProduct/MyModal-rateProduct.jsx';

import styles from '../style.module.scss';


export const Dashboard = () => {

  return (
    <section className={styles.main_section}>
      <ModalAboutProduct /> 
      <ModalTransferProduct/>
      <ModalRateProduct/>
      <Header />
      <Navbar />
      <main className={styles.main}>
        <DashboardTable />
      </main>
    </section>
  );
};
