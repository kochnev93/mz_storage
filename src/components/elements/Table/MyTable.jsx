import React, { useMemo, useState } from 'react';
import styles from './Table.module.scss';
import ModalProduct from '../../ui/Modal/MyModal-getProduct.jsx';

import { AiOutlineInfoCircle } from 'react-icons/Ai';
import { BiTransfer } from 'react-icons/Bi';

export const MyTable = ({ titleColumn, content = null }) => {
  const [modalWindow, setModalWindow] = useState({
    visible: true, 
    product: null,
  });

  const columns = titleColumn.map((column) => <th>{column}</th>);

  let captionCount;
  let bodyContent;

  const showProduct = (e) => {
    console.log(e.target.dataset.productID);
    setModalWindow({
      visible: true,
      product: e.target.dataset.productID,
    });
  }

  const getEmptyLine = () => {
    return (
      <tr className={styles.empty_line}>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  };

  console.log(typeof content, !!content, content)

  if (!content){
    return (
      <>
      <ModalProduct
      active={modalWindow.visible}
      setActive={setModalWindow}
      product={modalWindow.product}
    />
      <table className={styles.myTable}>
      <caption>Найдено записей: 0</caption>
      <thead>
        <tr>{columns}</tr>
      </thead>
      <tbody>{getEmptyLine()}</tbody>
      <tfoot></tfoot>
    </table>
    </>
    );
  }


    captionCount = useMemo(() => content.length, [content]);
    bodyContent = useMemo(() =>
        content.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.warehouse_title}</td>
            <td>{item.category_title}</td>
            <td>{item.name}</td>
            <td>{item.sn}</td>
            <td>{item.count}</td>
            <td>
              <div className={styles.product_action}>
                <AiOutlineInfoCircle
                  data-productID={item.id}
                  title="Информация"
                  onClick={(e) => {showProduct(e)}}
                />
                <BiTransfer title="Перемещение" />
              </div>
            </td>
          </tr>
        )),
      [content]
    ); 

  return (
    <>
      <ModalProduct
        active={modalWindow.visible}
        setActive={setModalWindow}
        product={modalWindow.product}
      />

      <table className={styles.myTable}>
        <caption>Найдено записей: {captionCount} </caption>
        <thead>
          <tr>{columns}</tr>
        </thead>

        <tbody>{bodyContent || getEmptyLine()}</tbody>

        <tfoot></tfoot>
      </table>
    </>
  );
};
