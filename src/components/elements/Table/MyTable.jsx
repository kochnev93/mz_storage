import React, { useMemo, useState } from 'react';
import styles from './Table.module.scss';
import useFilterTable from '../../../hooks/useFilterTable';

export const MyTable = ({ titleColumn, content = [] }) => {
  console.log('CONTENT', content)
  const columns = titleColumn.map((column) => <th>{column}</th>);


  content = [
    {
      id: 1,
      name: 'Монитор Asus P123DF',
      id_warehouse: 12,
      warehouse_title: '10-я линия В.О., 17к2',
      id_category: 2,
      category_title: 'Монитор',
      sn: '123'
    },
    {
      id: 1,
      name: 'Монитор Asus P123DF',
      id_warehouse: 12,
      warehouse_title: '10-я линия В.О., 17к2',
      id_category: 2,
      category_title: 'Монитор',
      sn: '123456'
    },
    {
      id: 3033,
      name: 'АДМ Ligat',
      id_warehouse: 12,
      warehouse_title: '10-я линия В.О., 17к2',
      id_category: 2,
      category_title: 'Монитор',
      sn:[],
      count: 12
    },
    {
      id: 3036,
      name: 'АДМ Ligat66',
      id_warehouse: 12,
      warehouse_title: '10-я линия В.О., 17к2',
      id_category: 2,
      category_title: 'Монитор',
      sn: '123321123',
    },
  ];

  let captionCount;
  let bodyContent = useFilterTable(content);

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

  captionCount = useMemo(() => {
    return content === null ? 0 : content.length;
  }, [content]);

  console.log('BODYCONTENT', bodyContent)

  return (
    <>
      <table className={styles.myTable}>
        <caption>Найдено записей: {captionCount} </caption>
        <thead>
          <tr>{columns}</tr>
        </thead>

        <tbody>
          {bodyContent.length ? bodyContent : getEmptyLine() }
          { getEmptyLine() }
        </tbody>

        <tfoot></tfoot>
      </table>
    </>
  );
};

MyTable.defaultProps = {
  content: [
    {
      warehouse_title: 'warehouse',
      category_title: 'category',
      name: 'name',
      sn: 'sn',
      count: 123,
      id: 999,
    },
  ],
};
