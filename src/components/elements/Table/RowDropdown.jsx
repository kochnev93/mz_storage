import React, { useState } from 'react';
import cx from 'classnames';

import { AiOutlineInfoCircle } from 'react-icons/Ai';
import { BiTransfer } from 'react-icons/Bi';

import styles from './Table.module.scss';

//Hooks
import { useDispatch } from 'react-redux';
import { setActive } from '../../../features/modal/about-productSlice';
import { setActiveTransfer } from '../../../features/modal/transfer-productSlice';


const RowDropdown = ({ product, count, sn }) => {
  const dispatch = useDispatch();

  // Состояние скрытых строк
  const [visible, setVisible] = useState(false);


  const clickHandler = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  const declination = (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  };

  const mainRow = () => {
    return (
      <tr>
        <td>{product?.id}</td>
        <td>{product?.warehouse_title}</td>
        <td>{product?.category_title}</td>
        <td>{product?.name}</td>
        <td>
          <a
            href=""
            onClick={clickHandler}
            className={styles.count_link}
            title={visible ? 'Скрыть' : 'Показать'}
          >{`${count} ${declination(
            count,
            'вариант',
            'варианта',
            'вариантов'
          )}`}</a>
        </td>
        <td>{count}</td>
        <td>
          <div className={styles.product_action}>
            <AiOutlineInfoCircle
              title="Информация"
              onClick={(e) => {
                dispatch(
                  setActive({
                    active: true,
                    product_id: product?.id,
                    warehouse_id: product?.id_warehouse
                  })
                );
              }}
            />
          </div>
        </td>
      </tr>
    );
  };

  const subRow = sn.map((item) => {
    return (
      <tr className={cx(styles.row, { [styles.active]: visible })}>
        <td> </td>
        <td> </td>
        <td> </td>
        <td>{product?.name}</td>
        <td>{item}</td>
        <td>{'1'}</td>
        <td>
          <div className={styles.product_action}>
          <BiTransfer 
              title="Перемещение" 
              onClick={(e) => {
                dispatch(
                  setActiveTransfer({
                    active: true,
                    activeProductID: product?.id,
                    product: {...product, sn: item},
                  })
                );
              }}
              />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <>
      {mainRow()}
      {subRow}
    </>
  );
};

export default RowDropdown;
