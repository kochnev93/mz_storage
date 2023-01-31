import React from 'react';
import styles from './Table.module.scss';

export const MyTable = ({ titleColumn, content = [], resultCount = 0 }) => {

  const columns = titleColumn.map((column) => <th>{column}</th>);
  // content = [
  //   {
  //     id: 1,
  //     name: 'Монитор Asus P123DF',
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: '123',
  //     sn_accounting: true
  //   },
  //   {
  //     id: 1,
  //     name: 'Монитор Asus P123DF',
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: '123456',
  //     sn_accounting: true
  //   },
  //   {
  //     id: 3033,
  //     name: 'АДМ Ligat',
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn:[],
  //     count: 12,
  //     sn_accounting: false
  //   },
  //   {
  //     id: 3036,
  //     name: 'АДМ Ligat66',
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: '123321123',
  //     sn_accounting: true
  //   },
  // ];
  let captionCount;

  const getEmptyLine = () => {
    return (
      <tr className={styles.empty_line}>
        <td>&nbsp;</td>
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
      <table className={styles.myTable}>
        <caption>Найдено записей: {resultCount} </caption>
        <thead>
          <tr>{columns}</tr>
        </thead>

        <tbody>
          {content.length ? content : getEmptyLine() }
          { getEmptyLine() }
        </tbody>

        <tfoot></tfoot>
      </table>
    </>
  );
};

