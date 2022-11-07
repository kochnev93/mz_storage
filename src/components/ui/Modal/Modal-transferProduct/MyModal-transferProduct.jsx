import React, { useState, useEffect } from 'react';
import cx from 'classnames';

// Hooks
import authHeader from '../../../../services/auth-header';
import { useAuth } from '../../../../hooks/use-auth';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {setActiveTransfer, setErrorsTransfer, setMessageTransfer, setResetTransfer, setIsLoadingTransfer, setDefaultTransfer} from '../../../../features/modal/transfer-productSlice';

//Styles
import styles from './MyModal-transferProduct.module.scss';

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import Modal from '../MyModal2.jsx';


function ModalTransferProduct() {
  const dispatch = useDispatch();
  const user = useAuth();

  // Redux
  const active = useSelector((state) => state.modal_transfer_product.active);
  const product = useSelector((state) => state.modal_transfer_product.product);
  const errors = useSelector((state) => state.modal_transfer_product.errors);
  const message = useSelector((state) => state.modal_transfer_product.message);
  const reset = useSelector((state) => state.modal_transfer_product.reset);
  const isLoading = useSelector((state) => state.modal_transfer_product.isLoading);

  console.log(product)

  return (
    <Modal
      active={active}
      setActive={() => {
        dispatch(setActiveTransfer({ active: false }));
      }}
      title={`Перемещение товара`}
      message={message}
      errors={errors}
      isLoading={isLoading}
    >
      <p>Вы перемещате {product?.id}-{product?.name} с серийным номером <b>{product?.sn}</b> со склада {product?.warehouse_title}</p>
      <h4>Куда переместить?</h4>
      <MyDropdown
            id="transfer_warehouse"
            title="Склад"
            placeholder="Выберите склад"
            multiple={false}
            validation={() => {}}
            changeValue={() => {}}
            url={'get_warehouse'}
          />
    </Modal>
  );
}

export default ModalTransferProduct;