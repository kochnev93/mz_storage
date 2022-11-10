import React from 'react';
import cx from 'classnames';

import { AiOutlineInfoCircle } from 'react-icons/Ai';
import { BiTransfer } from 'react-icons/Bi';
import styles from './Table.module.scss'

//Hooks
import { useDispatch } from 'react-redux';
import { setActive } from '../../../features/modal/about-productSlice';
import { setActiveTransfer } from '../../../features/modal/transfer-productSlice';



const Row = ({product}) => {
    const dispatch = useDispatch();

    const transferIcon = () => {
      if(product?.sn_accounting){
        return(
          <BiTransfer 
              title="Перемещение" 
              onClick={(e) => {
                dispatch(
                  setActiveTransfer({
                    active: true,
                    product: {...product, sn: product.sn[0]},
                  })
                );
              }}
          />
        )
      } else {
        return(
          <BiTransfer 
            title="Расход" 
          />
        )
      }
    }

    return (
        <tr>
          <td>{product?.id}</td>
          <td>{product?.warehouse_title}</td>
          <td>{product?.category_title}</td>
          <td>{product?.name}</td>
          <td>{product?.sn}</td>
          <td>{product?.count ? product.count : product.sn.length}</td>
          <td>
            <div className={styles.product_action}>
              <AiOutlineInfoCircle
                data-productID={product?.id}
                title="Информация"
                onClick={(e) => {
                  dispatch(
                    setActive({ active: true, product_id: e.target.dataset.productID })
                  );
                }}
              />
              {transferIcon()}
            </div>
          </td>
        </tr>
    )
}

export default Row;