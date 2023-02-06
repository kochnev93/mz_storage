import React from 'react';
import styles from './Table.module.scss';

export const MyTable = ({ titleColumn, content = [], resultCount = 0 }) => {

  const columns = titleColumn.map((column) => <th>{column}</th>);

  let captionCount;

  const getEmptyLine = (titleColumn) => {
    const tdCount = titleColumn.map((item) => <td>&nbsp;</td>);
    return (
      <tr className={styles.empty_line}>
        {tdCount}
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
          {content.length ? content : getEmptyLine(titleColumn) }
          { getEmptyLine(titleColumn) }
        </tbody>

        <tfoot></tfoot>
      </table>
    </>
  );
};

