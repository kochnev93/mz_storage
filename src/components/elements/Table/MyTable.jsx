import React, { Component } from 'react';
import styles from './Table.module.scss';

export const MyTable = (props) => {
  const titleColumn = props.titleColumn;
  const columns = titleColumn.map((column) => <th>{column}</th>);
  
  const content = props.content;
  let bodyContent;
  let captionCount;

  if(content){
    captionCount = content.length;
    bodyContent = content.map((item, index) => 
    <tr>
      <td>{index + 1}</td>
      <td>{item.warehouse_product}</td>
      <td>{item.category_product}</td>
      <td>{item.name_product}</td>
      <td>{item.sn_product}</td>
      <td>{item.count}</td>
      <td>Action</td>
    </tr>
    );
  }


  return (
    <table className={styles.myTable}>
      <caption>Найдено записей: {captionCount} </caption>
      <thead>
        <tr>{columns}</tr>
      </thead>

      <tbody>
        {bodyContent || ''}
      </tbody>

      <tfoot>

      </tfoot>
    </table>
  );
};
