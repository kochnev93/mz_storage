import React, { useState, useEffect } from 'react';
import cx from 'classnames';

// Hooks
import authHeader from '../../../../services/auth-header';
import { useAuth } from '../../../../hooks/use-auth';
import useFetch from '../../../../hooks/useFetch';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {setActiveRate, setErrorsRate, setMessageRate, setResetRate, setIsLoadingRate, setDefaultRate} from '../../../../features/modal/rate-productSlice';


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

  // State
  const [warehouse, setWarehouse] = useState([]);
  const [validationWarehouse, setValidationWarehouse] = useState(true);


    // Redux
    const active = useSelector((state) => state.modal_rate_product.active);
    const errors = useSelector((state) => state.modal_rate_product.errors);
    const message = useSelector((state) => state.modal_rate_product.message);
    const reset = useSelector((state) => state.modal_rate_product.reset);
    const isLoading = useSelector(
      (state) => state.modal_rate_product.isLoading
    );


    const rate = () => {
      console.log('rate');
    }

  

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
        <h4>Текущее расположение</h4>
        <table className={styles.product_table}>
          <tr>
            <th>ID</th>
            <td>1</td>
          </tr>
          <tr>
            <th>Наименование</th>
            <td>1</td>
          </tr>
            <tr>
              <th>Количество</th>
              <td>1</td>
            </tr>
          <tr>
            <th>Склад</th>
            <td>1</td>
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
