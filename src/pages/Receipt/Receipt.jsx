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
import MyButton from '../../components/ui/Buttons/ButtonSend.jsx';
import ModalAboutReceipt from '../../components/ui/Modal/Modal-aboutReceipt/MyModal-aboutreceipt.jsx';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setActiveReceipt } from '../../features/modal/receipt-productSlice.js';
import { setActiveAboutReceipt, fetchReceiptProducts } from '../../features/modal/about-receiptSlice';

// Hooks
import useFetch from '../../hooks/useFetch';

export const Receipt = () => {
  const { fetchNow } = useFetch();
  const dispatch = useDispatch();

  // State
  const [receiptData, setReceiptData] = useState([]);
  const [titleColumn] = useState([
    'id',
    'Склад',
    'Контрагент',
    'Договор',
    'Количество',
    'Дата',
  ]);

  const {id_receipt} = useSelector((state) => state.modal_about_receipt);


  useEffect(() => {
    getReceipt();
  }, []);

  useEffect(() => {
    if(id_receipt){
      dispatch(fetchReceiptProducts(id_receipt))
    }
  }, [id_receipt]);

  const bodyContent = useMemo(() => {
    if (receiptData) {
      return receiptData.map((item) => {
        return (
          <tr
            onClick={() => {
              dispatch(
                setActiveAboutReceipt({
                  active: true,
                  id_receipt: item.id_receipt,
                })
              );
            }}
            title={'Подробне...'}
          >
            <td>{item.id_receipt}</td>
            <td>{item.warehouse_title}</td>
            <td>{item.contragent}</td>
            <td>{item.contract}</td>
            <td>{item.count}</td>
            <td>{new Date(item.date).toLocaleString()}</td>
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
        <ModalAboutReceipt/>
        <h1>Приход</h1>

        <div className={styles.header}>
          <div className={styles.header_filter}>Фильтры</div>
          <MyButton
            type="send"
            title="Добавить"
            action={() => {
              dispatch(setActiveReceipt({ active: true }));
            }}
          />
        </div>

        <MyTable titleColumn={titleColumn} content={bodyContent} resultCount={receiptData.length} />
      </main>
    </section>
  );
};
