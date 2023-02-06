import React from 'react';
import styles from './Table.module.scss';

export const MyTable = ({ titleColumn, content = [], resultCount = 0 }) => {

  const columns = titleColumn.map((column) => <th>{column}</th>);

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

