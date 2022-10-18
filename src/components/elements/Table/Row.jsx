import React from 'react';

import { AiOutlineInfoCircle } from 'react-icons/Ai';
import { BiTransfer } from 'react-icons/Bi';
import styles from './Table.module.scss'

//Hooks
import { useDispatch } from 'react-redux';
import { setActive } from '../../../features/modal/about-productSlice';


const Row = (props) => {
    const dispatch = useDispatch();

    return (
        <tr>
          <td>{props.product?.id}</td>
          <td>{props.product?.warehouse_title}</td>
          <td>{props.product?.category_title}</td>
          <td>{props.product?.name}</td>
          <td>{props.product?.sn}</td>
          <td>{props.product?.count}</td>
          <td>
            <div className={styles.product_action}>
              <AiOutlineInfoCircle
                data-productID={props.product?.id}
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
    )
}

export default Row;