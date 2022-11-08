import React, { useState, useEffect } from 'react';
import cx from 'classnames';

// Hooks
import authHeader from '../../../../services/auth-header';
import { useAuth } from '../../../../hooks/use-auth';
import useFetch from '../../../../hooks/useFetch';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveTransfer,
  setErrorsTransfer,
  setMessageTransfer,
  setResetTransfer,
  setIsLoadingTransfer,
  setDefaultTransfer,
} from '../../../../features/modal/transfer-productSlice';

//Styles
import styles from './MyModal-transferProduct.module.scss';

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import Modal from '../MyModal2.jsx';
import MyButton from '../../Buttons/ButtonSend.jsx';

function ModalTransferProduct() {
  const dispatch = useDispatch();
  const user = useAuth();

  // Redux
  const active = useSelector((state) => state.modal_transfer_product.active);
  const product = useSelector((state) => state.modal_transfer_product.product);
  const errors = useSelector((state) => state.modal_transfer_product.errors);
  const message = useSelector((state) => state.modal_transfer_product.message);
  const reset = useSelector((state) => state.modal_transfer_product.reset);
  const isLoading = useSelector(
    (state) => state.modal_transfer_product.isLoading
  );

  // Local State
  const [warehouse, setWarehouse] = useState([]);
  const [validationWarehouse, setValidationWarehouse] = useState(true);

  const { fetchNow } = useFetch();

  const checkTransfer = () => {
    // Функция сверяет текущий склад со складом, который в БД
    
    // Получение данных с сервера
    //---//

    if(result.data !== product?.id_warehouse){
      dispatch(
        setMessageTransfer({
          errors: true,
          message: 'Товар был перемещен ранее, обновите страницу',
        })
      );

      return false;
    }

    return true;
  }

  const validation = () => {
    dispatch(setDefaultTransfer());
    setValidationWarehouse(true);

    if (warehouse.length === 0) {
      dispatch(setMessageTransfer({ errors: true, message: 'Выберите склад' }));
      setValidationWarehouse(false);
      return false;
    }

    if (warehouse[0].title === product?.warehouse_title) {
      dispatch(
        setMessageTransfer({
          errors: true,
          message: 'Выбранный склад совпадает с текущим',
        })
      );
      setValidationWarehouse(false);
      return false;
    }

    let answerUser = confirm(
      `Переместить товар ${product?.name} (${product?.sn}) на склад ${warehouse[0].title}?`
    );

    return answerUser ? true : false;
  };

  const transfer = async () => {
    if (validation()) {
      dispatch(setIsLoadingTransfer({ isLoading: true }));

      let data = JSON.stringify({
        warehouse: warehouse,
        sn: product?.sn,
      });

      let requestOptions = {
        method: 'POST',
        body: data,
      };

      const result = await fetchNow(
        'http://localhost:3001/api/transfer_product',
        requestOptions
      );

      if (result.data) {
        dispatch(setMessageTransfer({ message: result.data }));
        setTimeout(() => {
          dispatch(setIsLoadingTransfer({ isLoading: false }));
        }, 100);
      } else {
        console.warn(result.error);
        dispatch(setMessageTransfer({ errors: true, message: result.error }));
      }
    }
  };

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
      <div className={styles.transfer_item}>
        <h4>Выберите склад для перемещения</h4>
        <MyDropdown
          id="transfer_warehouse"
          title="Склад"
          placeholder="Выберите склад"
          multiple={false}
          validation={validationWarehouse}
          changeValue={setWarehouse}
          url={'get_warehouse'}
        />
      </div>

      <div className={styles.transfer_item}>
        <h4>Текущее расположение</h4>
        <table className={styles.product_table}>
          <tr>
            <th>ID</th>
            <td>{product?.id}</td>
          </tr>
          <tr>
            <th>Наименование</th>
            <td>{product?.name}</td>
          </tr>
          <tr>
            <th>SN</th>
            <td>{product?.sn}</td>
          </tr>
          <tr>
            <th>Склад</th>
            <td>{product?.warehouse_title}</td>
          </tr>
        </table>
      </div>

      <div className={styles.buttons}>
        <MyButton
          type="send"
          action={transfer}
          title="Переместить"
          loadingTitle="Перемещаю"
          loading={isLoading}
        />
      </div>
    </Modal>
  );
}

export default ModalTransferProduct;
