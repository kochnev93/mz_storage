import React from 'react';
import styles from './Table.module.scss';

export const Table = ({ titleColumn=['1', '2'], content = [], resultCount }) => {

  const columns = titleColumn.map((column) => <th>{column}</th>);

  const getEmptyLine = (titleColumn) => {
    const tdCount = titleColumn.map((item) => <td>&nbsp;</td>);
    return (
      <tr className={styles.empty_line}>
        {tdCount}
      </tr>
    );
  };


  let json = {
    content: [],

  }

  let titleColumns = [
    {
        title: 'id'
    },
    {
        title: 'Название'
    },
    {
        title: 'SN'
    },
  ]







    // let data = [
  //   {
  //     id_product: 1,
  //     name: 'Монитор Asus P123DF',
  //     id_nomenclature: 1,
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: '123',
  //     accounting_sn: true
  //   },
  //   {
  //     id_product: 2,
  //     name: 'Монитор Asus P123DF',
  //     id_nomenclature: 1,
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: '123456',
  //     accounting_sn: true
  //   },
  //   {
  //     id_product: 3033,
  //     name: 'АДМ Ligat',
  //     id_nomenclature: 2,
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn:[],
  //     count: 12,
  //     accounting_sn: false
  //   },
  //   {
  //     id_product: 3036,
  //     name: 'АДМ Ligat66',
  //     id_nomenclature: 3,
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: '123321123',
  //     accounting_sn: true
  //   },
  // ];

  return (
    <>
      <table className={styles.myTable}>
        <caption>{resultCount ? resultCount : null}</caption>
        <thead>
          <tr>{columns}</tr>
        </thead>

        <tbody>
          {content.length ? content : getEmptyLine(titleColumn) }
          { getEmptyLine(titleColumn) }
        </tbody>

        <tfoot></tfoot>
      </table>
    </>
  );
};
