import React, { useState, useEffect } from 'react';
import cx from 'classnames';

// Hooks
import authHeader from '../../../../services/auth-header';
import { useAuth } from '../../../../hooks/use-auth';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setActive,
  setErrors,
  setIsLoading,
  setMessage,
} from '../../../../features/modal/about-productSlice';

//Styles
import styles from './MyModal-transferProduct.module.scss';

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import Modal from '../MyModal2.jsx';


function ModalTransferProduct() {
  const dispatch = useDispatch();
  const user = useAuth();

  // Local State
  const [data, setData] = useState(null);
  const [history, setHistory] = useState(null);
  const [disabled, setDisabled] = useState(
    user.role === 'admin' ? false : true
  );

  // Redux
  const active = useSelector((state) => state.modal_about_product.active);
  const product = useSelector((state) => state.modal_about_product.product_id);
  const errors = useSelector((state) => state.modal_about_product.errors);
  const message = useSelector((state) => state.modal_about_product.message);
  const reset = useSelector((state) => state.modal_about_product.reset);
  const isLoading = useSelector((state) => state.modal_about_product.isLoading);

  return (
    <Modal
      active={active}
      setActive={() => {
        dispatch(setActive({ active: false }));
      }}
      title="Информация о товаре"
      message={message}
      errors={errors}
      isLoading={isLoading}
      footer={
        disabled
          ? 'Редактирование запрещено. Обратитесь к администратору'
          : 'Редактирование разрешено'
      }
    >
  <h1>TRANSFER</h1>
    </Modal>
  );
}

export default ModalTransferProduct;