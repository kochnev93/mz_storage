import React, { useMemo, useState } from 'react';
import styles from './Table.module.scss';
import ModalProduct from '../../ui/Modal/MyModal-getProduct.jsx';

import { AiOutlineInfoCircle } from 'react-icons/Ai';
import { BiTransfer } from 'react-icons/Bi';

export const MyTable = ({ titleColumn, content }) => {
  const [modalWindow, setModalWindow] = useState({
    visible: false,
    product: null,
  });

  const columns = titleColumn.map((column) => <th>{column}</th>);

  let captionCount;
  let bodyContent;

  const showProduct = () => {
    //alert("Скоро тут будет карточка товара..")
  };

  if (content) {
    captionCount = useMemo(() => content.length, [content]);
    // bodyContent = useMemo(
    //   () =>
    //     content.map((item, index) => (
    //       <tr onClick={showProduct}>
    //         <td>{index + 1}</td>
    //         <td>{item.warehouse_title}</td>
    //         <td>{item.category_title}</td>
    //         <td>{item.name}</td>
    //         <td>{item.sn}</td>
    //         <td>{item.count}</td>
    //         <td>
    //           <div className={styles.product_action}>
    //             <AiOutlineInfoCircle
    //               data-productID={item.id}
    //               title="Информация"
    //               onClick={(e) => {
    //                 console.log(e.target.dataset.productID);
    //                 setModalWindow({
    //                   visible: true,
    //                   product: e.target.dataset.productID,
    //                 });
    //               }}
    //             />
    //             <BiTransfer title="Перемещение" />
    //           </div>
    //         </td>
    //       </tr>
    //     )),
    //   [content]
    // );

    bodyContent = content.map((item, index) => (
      <tr onClick={showProduct}>
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
              onClick={(e) => {
                setModalWindow({
                  visible: true,
                  product: e.target.dataset.productID,
                });
              }}
            />
            <BiTransfer title="Перемещение" />
          </div>
        </td>
      </tr>
    ));
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
