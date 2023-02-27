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
  editProductTransfer,
  setDefaultTransfer,
} from '../../../../features/modal/transfer-productSlice';
import { editProduct } from '../../../../features/dashboard/dashboardSlice';

//Styles
import styles from './MyModal-transferProduct.module.scss';

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import Modal from '../MyModal2.jsx';
import MyButton from '../../Buttons/ButtonSend.jsx';
import MyInput from '../../Input/MyInput.jsx';

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
  const [count, setCount] = useState('');
  const [validationCount, setValidationCount] = useState(true);

  const { fetchNow } = useFetch();

  useEffect(() => {
    resetValidation();
  }, [product]);

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

    // Проверка при перемещении не серийного товара
    if (!product?.accounting_sn) {
      if (count === null || count === '') {
        dispatch(
          setMessageTransfer({
            errors: true,
            message: 'Введите количество',
          })
        );
        setValidationCount(false);
        return false;
      }

      if (count < 1) {
        dispatch(
          setMessageTransfer({
            errors: true,
            message: 'Некорректное значение (количество >= 1)',
          })
        );
        setValidationCount(false);
        return false;
      }

      if (count > product?.count) {
        dispatch(
          setMessageTransfer({
            errors: true,
            message: 'Количество превышает остаток товара',
          })
        );
        setValidationCount(false);
        return false;
      }
    }

    let answerUser = confirm(
      `Переместить товар ${product?.name} (${product?.sn}) на склад ${warehouse[0].title}?`
    );

    return answerUser ? true : false;
  };

  const resetValidation = () => {
    dispatch(setDefaultTransfer());
    dispatch(setResetTransfer({ reset: true }));

    setWarehouse([]);
    setValidationWarehouse(true);
    setCount(null);
    setValidationCount(true);
  }

  const transfer = async () => {
    if (validation()) {
      dispatch(setIsLoadingTransfer({ isLoading: true }));

      let data = JSON.stringify({
        accounting_sn: product?.accounting_sn,
        id_product: product.id,
        new_warehouse: warehouse[0].id,
        old_warehouse: product.id_warehouse,
        sn: product?.sn,
        transfer_count: count,
        count: product?.count
      });

      let requestOptions = {
        method: 'POST',
        body: data,
      };

      const result = await fetchNow(
        `${process.env.REACT_APP_API_SERVER}/transfer_product`,
        requestOptions
      );

      if (result.data) {
        dispatch(setMessageTransfer({ message: result.data }));

        setTimeout(() => {
          dispatch(setIsLoadingTransfer({ isLoading: false }));
        }, 100);

        dispatch(editProduct({ unit: product, new_warehouse: warehouse }));
        dispatch(editProductTransfer({ new_warehouse: warehouse }));
        setWarehouse([]);
        dispatch(setResetTransfer({ reset: true }));
      } else {
        console.warn(result.error);
        dispatch(setMessageTransfer({ errors: true, message: result.error }));

        setTimeout(() => {
          dispatch(setIsLoadingTransfer({ isLoading: false }));
        }, 100);
        
      }
    }
  };

  return (
    <Modal
      active={active}
      setActive={() => {
        dispatch(setActiveTransfer({ active: false }));
        dispatch(setDefaultTransfer());
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
          reset={reset}
          setReset={() => dispatch(setResetTransfer({ reset: false }))}
          url={'get_warehouse'}
        />
      </div>

      {!product?.accounting_sn && (
        <div className={styles.transfer_item}>
          <MyInput
            type="number"
            title="Количество"
            changeValue={setCount}
            validation={validationCount}
            value={count}
          />
        </div>
      )}

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
          {!product?.accounting_sn && (
            <tr>
              <th>Количество</th>
              <td>{product?.count}</td>
            </tr>
          )}
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
