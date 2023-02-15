import React, { useState, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setActiveAboutReceipt } from '../../../../features/modal/about-receiptSlice.js';

// Style
import styles from './MyModal-aboutreceipt.module.scss';

// Components
import Modal from '../MyModal2.jsx';

function ModalAboutReceipt() {
  const dispatch = useDispatch();

  const { active, errors, message, reset, isLoading, id_receipt, receipt } =
    useSelector((state) => state.modal_about_receipt);

  return (
    <Modal
      active={active}
      setActive={() => {
        dispatch(setActiveAboutReceipt({ active: false }));
      }}
      title="Информация о приходе"
      message={message}
      errors={errors}
      isLoading={isLoading}
      footer={''}
    >
      <h2>
        Приход № <u>{id_receipt}</u>{' '}
      </h2>

      <table className={styles.table}>
        <tr>
          <th>Контрагент</th>
          <td>{receipt.contragent}</td>
        </tr>
        <tr>
          <th>Склад</th>
          <td>{receipt.warehouse_title}</td>
        </tr>
        <tr>
          <th>Количество</th>
          <td>{receipt.count}</td>
        </tr>
        <tr>
          <th>Договор</th>
          <td>{receipt.contract}</td>
        </tr>
        <tr>
          <th>Ссылка</th>
          <td>{receipt.url ? receipt.url : ''}</td>
        </tr>
        <tr>
          <th>Дата создания</th>
          <td>{new Date(receipt.date).toLocaleString()}</td>
        </tr>
        <tr>
          <th>Автор</th>
          <td>{receipt.author}</td>
        </tr>
      </table>

      <h2>Состав прихода</h2>
      <table className={styles.table}>
        <tr>
          <th>Номер</th>
          <th>Наименование</th>
          <th>SN</th>
          <th>Количество</th>
        </tr>
        {receipt?.products?.map((item, index) => {
          return (
            <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.sn ? item.sn : ''}</td>
                <td>{item.accounting_sn ? 1 : receipt.count}</td>
            </tr>
          );
        })}
      </table>
      
    </Modal>
  );
}

export default ModalAboutReceipt;
