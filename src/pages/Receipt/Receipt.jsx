import React, { useState, useEffect, useMemo } from 'react';

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

// Hooks
import useFetch from '../../hooks/useFetch';

export const Receipt = () => {
  const { fetchNow } = useFetch();
  const dispatch = useDispatch();

  // State
  const [receiptData, setReceiptData] = useState(null);
  const [titleColumn] = useState([
    'id',
    'id продукта',
    'Наименование',
    'Контрагент',
    'Склад',
    'Категория',
    'Количество',
    'Договор',
    'Ссылка',
    'Дата',
    'Автор',
  ]);

  useEffect(() => {
    getReceipt();
  }, []);

  const bodyContent = useMemo(() => {
    if (receiptData) {
      return receiptData.map((item) => {
        return (
          <tr>
            <td>{item.id_receipt}</td>
            <td>{item.id_product}</td>
            <td>{item.name}</td>
            <td>{item.contragent}</td>
            <td>{item.warehouse_title}</td>
            <td>{item.category_title}</td>
            <td>{item.count}</td>
            <td>{item.contract}</td>
            <td>{item.url_megaplan}</td>
            <td>{new Date(item.date).toLocaleString()}</td>
            <td>{item.author}</td>
          </tr>
        );
      });
    }
  }, [receiptData]);

  const getReceipt = async () => {
    let requestOptions = {
      method: 'GET',
    };

    const receiptList = await fetchNow(
      `${process.env.REACT_APP_API_SERVER}/get_receiptList`,
      requestOptions
    );

    if (receiptList.data) {
      setReceiptData(receiptList.data);
    }
  };

  return (
    <section className={styles.main_section}>
      <ModalReceiptProduct />
      <Header title="Приход" />
      <Navbar />
      <main className={styles.main}>
        <h1>Приход</h1>
        <MyTable titleColumn={titleColumn} content={bodyContent} />
      </main>
    </section>
  );
};
