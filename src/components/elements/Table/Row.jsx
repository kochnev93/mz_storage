import React from 'react';

import { AiOutlineInfoCircle } from 'react-icons/Ai';
import { BiTransfer } from 'react-icons/Bi';
import { TiMinus } from 'react-icons/Ti';
import styles from './Table.module.scss';

//Hooks
import { useDispatch } from 'react-redux';
import { setActive } from '../../../features/modal/about-productSlice';
import { setActiveTransfer } from '../../../features/modal/transfer-productSlice';
import { setActiveRate } from '../../../features/modal/rate-productSlice';

const Row = ({ product, key }) => {
  const dispatch = useDispatch();

  const getIcon = () => {
    if (product?.accounting_sn) {
      return (
        <>
          <AiOutlineInfoCircle
            title="Информация"
            onClick={(e) => {
              dispatch(
                setActive({
                  active: true,
                  product: { ...product, sn: product.sn[0].sn },
                })
              );
            }}
          />
          <BiTransfer
            title="Перемещение"
            onClick={(e) => {
              dispatch(
                setActiveTransfer({
                  active: true,
                  product: { ...product, sn: product.sn[0].sn },
                })
              );
            }}
          />
        </>
      );
    } else {
      return (
        <>
          <AiOutlineInfoCircle
            title="Информация"
            onClick={(e) => {
              dispatch(
                setActive({
                  active: true,
                  product: { ...product, count: product.count },
                })
              );
            }}
          />

          <BiTransfer
            title="Перемещение"
            onClick={(e) => {
              dispatch(
                setActiveTransfer({
                  active: true,
                  product: { ...product, count: product.count },
                })
              );
            }}
          />

          <TiMinus
            title="Расход"
            onClick={(e) => {
              dispatch(
                setActiveRate({
                  active: true,
                  product: { ...product, count: product.count },
                })
              );
            }}
          />
        </>
      );
    }
  };

  return (
    <tr key={key}>
      <td>{product?.id}</td>
      <td>{product?.warehouse_title}</td>
      <td>{product?.category_title}</td>
      <td>{product?.name}</td>
      <td>{product?.sn[0]?.sn}</td>
      <td>{product?.count ? product.count : product.sn.length}</td>
      <td>
        <div className={styles.product_action}>
          {getIcon()}
        </div>
      </td>
    </tr>
  );
};

export default Row;
