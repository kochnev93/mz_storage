import React from 'react';
import styles from './Table.module.scss';

export const Table_v = ({ titleColumn, content = [] }) => {

  console.log(content)

  const columns = titleColumn.map((column) => <th>{column}</th>);

  const body = content.map((item) => {
    if(!item || !item.length) return <td>{'-'}</td>;
    return <td>{item}</td>;
  });

  return (
    <>
      <table className={styles.myTable_v} style={{display: 'flex', justifyContent: 'space-between'}}>
          <tr>{columns}</tr>
          <tr>{body}</tr>
      </table>
    </>
  );
};
