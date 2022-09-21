import React, { Component } from 'react';
import styles from './Table.module.scss';

import { AiOutlineInfoCircle } from 'react-icons/Ai';
import { BiTransfer } from 'react-icons/Bi';

export const MyTable = (props) => {
  const titleColumn = props.titleColumn;
  const columns = titleColumn.map((column) => <th>{column}</th>);
  
  const content = props.content;
  let bodyContent;
  let captionCount;

  const showProduct = () => {
    alert("Скоро тут будет карточка товара..")
  }

  if(content){
    captionCount = content.length;
    bodyContent = content.map((item, index) => 
    <tr onClick={showProduct}>
      <td>{index + 1}</td>
      <td>{item.warehouse_title}</td>
      <td>{item.category_title}</td>
      <td>{item.name}</td>
      <td>{item.sn}</td>
      <td>{item.count}</td>
      <td>
        <form className={styles.product_action}>
          <input type="hidden" name="product_id" value={item.id} />
          <input type="hidden" name="warehouse_id" value={item.warehouse_id} />
          <input type="hidden" name="category_id" value={item.category_id} />
          <AiOutlineInfoCircle title="Информация"/>
          <BiTransfer title="Перемещение"/>
        </form>
      </td>
    </tr>
    );
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
  }


  return (
    <table className={styles.myTable}>
      <caption>Найдено записей: {captionCount} </caption>
      <thead>
        <tr>{columns}</tr>
      </thead>

      <tbody>
        { bodyContent || getEmptyLine() }
      </tbody>

      <tfoot>

      </tfoot>
    </table>
  );
};
