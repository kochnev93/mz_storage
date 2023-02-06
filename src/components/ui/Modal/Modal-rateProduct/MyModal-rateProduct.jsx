import React, { useState, useEffect } from 'react';
import cx from 'classnames';

// Hooks
import authHeader from '../../../../services/auth-header';
import { useAuth } from '../../../../hooks/use-auth';
import useFetch from '../../../../hooks/useFetch';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveRate,
  setErrorsRate,
  setMessageRate,
  setResetRate,
  setIsLoadingRate,
  setDefaultRate,
  editRateProduct,
} from '../../../../features/modal/rate-productSlice';

//Styles
import styles from './MyModal-rateProduct.module.scss';

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import Modal from '../MyModal2.jsx';
import MyButton from '../../Buttons/ButtonSend.jsx';
import MyInput from '../../Input/MyInput.jsx';

function ModalRateProduct() {
  const dispatch = useDispatch();
  const user = useAuth();
  const { fetchNow } = useFetch();

  // State
  const [warehouse, setWarehouse] = useState([]);
  const [validationWarehouse, setValidationWarehouse] = useState(true);
  const [rateCount, setRateCount] = useState(null);
  const [validationRateCount, setRateValidationCount] = useState(true);

  // Redux
  const active = useSelector((state) => state.modal_rate_product.active);
  const product = useSelector((state) => state.modal_rate_product.product);
  const errors = useSelector((state) => state.modal_rate_product.errors);
  const message = useSelector((state) => state.modal_rate_product.message);
  const reset = useSelector((state) => state.modal_rate_product.reset);
  const isLoading = useSelector((state) => state.modal_rate_product.isLoading);

  const validation = () => {
    dispatch(setDefaultRate());
    setValidationWarehouse(true);
    setRateValidationCount(true);

    if (warehouse.length === 0) {
      dispatch(setMessageRate({ 
        errors: true, 
        message: 'Выберите склад' 
      }));
      setValidationWarehouse(false);
      return false;
    }

    if (warehouse[0].title === product?.warehouse_title) {
      dispatch(
        setMessageRate({
          errors: true,
          message: 'Выбранный склад совпадает с текущим',
        })
      );
      setValidationWarehouse(false);
      return false;
    }

      if (rateCount < 1) {
        dispatch(
          setMessageRate({
            errors: true,
            message: 'Некорректное значение (количество >= 1)',
          })
        );
        setRateValidationCount(false);
        return false;
      }

      if (rateCount > product?.count) {
        dispatch(
          setMessageRate({
            errors: true,
            message: 'Количество превышает остаток товара',
          })
        );
        setRateValidationCount(false);
        return false;
      }
    

    let answerUser = confirm(
      `Израсходовать "${product?.name}" на склад ${warehouse[0].title} в количестве ${rateCount} шт?`
    );

    return answerUser ? true : false;
  };

  const resetValidation = () => {
    dispatch(setDefaultRate());
    dispatch(setResetRate({ reset: true }));

    setWarehouse([]);
    setValidationWarehouse(true);
    setRateCount(null);
    setRateValidationCount(true);
  };

  const rate = async () => {
    if(validation()){
      console.log('rate');

      dispatch(setIsLoadingRate({ isLoading: true }));

      let data = JSON.stringify({
        id_product: product.id,
        new_warehouse: warehouse[0].id,
        old_warehouse: product.id_warehouse,
        rate_count: rateCount,
        count: product?.count
      });

      let requestOptions = {
        method: 'POST',
        body: data,
      };

      const result = await fetchNow(
        'http://localhost:3001/api/rate_product',
        requestOptions
      );

      if(result.data){
        dispatch(setMessageRate({ message: result.data }));

        setTimeout(() => {
          dispatch(setIsLoadingRate({ isLoading: false }));
        }, 100);

        dispatch(editRateProduct({ rateCount: rateCount }));
        dispatch(setResetRate({ reset: true }));

        setWarehouse([]);
        setRateCount(null);
        

      } else{
        console.warn(result.error);

        dispatch(setMessageRate({ errors: true, message: result.error }));

        setTimeout(() => {
          dispatch(setIsLoadingRate({ isLoading: false }));
        }, 100);
        
      }
    }
  };

  return (
    <Modal
      active={active}
      setActive={() => {
        dispatch(setActiveRate({ active: false }));
      }}
      title={`Расход товара`}
      message={message}
      errors={errors}
      isLoading={isLoading}
    >
      <div className={styles.transfer_item}>
        <h4>Выберите склад</h4>
        <MyDropdown
          id="rate_warehouse"
          title="Склад"
          placeholder="Выберите склад"
          multiple={false}
          validation={validationWarehouse}
          changeValue={setWarehouse}
          reset={reset}
          setReset={() => dispatch(setResetRate({ reset: false }))}
          url={'get_warehouse'}
        />
      </div>

      <div className={styles.transfer_item}>
        <MyInput
          type="number"
          title="Количество"
          changeValue={setRateCount}
          validation={validationRateCount}
          value={rateCount}
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
            <th>Склад</th>
            <td>{product?.warehouse_title}</td>
          </tr>
          <tr>
            <th>Количество</th>
            <td>{product?.count}</td>
          </tr>
        </table>
      </div>

      <div className={styles.buttons}>
        <MyButton
          type="send"
          action={rate}
          title="Расход"
          loadingTitle="Перемещаю"
          loading={isLoading}
        />
      </div>
    </Modal>
  );
}

export default ModalRateProduct;
