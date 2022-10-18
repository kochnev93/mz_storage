import React, { useMemo, useState } from 'react';
import styles from './Table.module.scss';

import { AiOutlineInfoCircle } from 'react-icons/Ai';
import { BiTransfer } from 'react-icons/Bi';

// REdux
import { useDispatch } from 'react-redux';
import { setActive } from '../../../features/modal/about-productSlice';


export const MyTable = ({ titleColumn, content = null }) => {
  const dispatch = useDispatch();

  const columns = titleColumn.map((column) => <th>{column}</th>);

  let captionCount;
  let bodyContent;

  // [
  //   {
  //     id: 1,
  //     name: 'Монитор Asus P123DF',
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: '123'
  //   },
  //   {
  //     id: 1,
  //     name: 'Монитор Asus P123DF',
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: '123 '
  //   },
  //   {
  //     id: 1,
  //     name: 'Монитор Asus P123DF',
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: 'пп'
  //   },
  //   {
  //     id: 1,
  //     name: 'Монитор Asus P123DF',
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: '!!!'
  //   },
  //   {
  //     id: 3,
  //     name: 'АДМ Ligat',
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: 'sn1'
  //   },
  //   {
  //     id: 3,
  //     name: 'АДМ Ligat',
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: 'sn2'
  //   }
  // ]

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

  captionCount = useMemo(() => {
    return content === null ? 0 : content.length;
  }, [content]);

  bodyContent = useMemo(() => {
    if (content === null) return getEmptyLine();
    let table = content.map((item, index) => (
      <tr>
        <td>{item.id}</td>
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
                dispatch(
                  setActive({ active: true, product_id: e.target.dataset.productID })
                );
              }}
            />
            <BiTransfer title="Перемещение" />
          </div>
        </td>
      </tr>
    ));
    return table;
  }, [content]);

  return (
    <>
      <table className={styles.myTable}>
        <caption>Найдено записей: {captionCount} </caption>
        <thead>
          <tr>{columns}</tr>
        </thead>

        <tbody>{bodyContent}</tbody>

        <tfoot></tfoot>
      </table>
    </>
  );
};

MyTable.defaultProps = {
  content: [{
    warehouse_title: 'warehouse',
    category_title: 'category',
    name: 'name',
    sn: 'sn',
    count: 123,
    id: 999
  }] 
}
