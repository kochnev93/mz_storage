import React, { useState } from 'react';

// Router
import { Outlet, Link } from 'react-router-dom';

// Styles
import styles from '../style.module.scss';

// Component
import Navbar from '../../components/Navbar/Navbar.jsx';
import Header from '../../components/Header/Header.jsx';
import ModalReceiptProduct from '../../components/ui/Modal/Modal-receiptProduct/MyModal-receiptProduct.jsx';
import { MyTable } from '../../components/elements/Table/MyTable.jsx';

// Redux
import { useDispatch } from 'react-redux';
import { setActiveReceipt } from '../../features/modal/receipt-productSlice.js';

export const Receipt = () => {
  const [titleColumn] = useState([
    'id',
    'id продукта',
    'Наименование',
    'Склад',
    'Серийный номер',
    'Количество',
    'Дата',
    'Автор',
  ])
  const dispatch = useDispatch();

  return (
    <section className={styles.main_section}>
      <ModalReceiptProduct />
      <Header title="Приход" />
      <Navbar />
      <main className={styles.main}>
        <h1>Приход</h1>
        <MyTable titleColumn={titleColumn}/>
      </main>
    </section>
  );
};
