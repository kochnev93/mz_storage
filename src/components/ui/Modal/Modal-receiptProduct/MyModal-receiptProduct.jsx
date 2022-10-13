import React, { useState, useEffect } from 'react';
import cx from 'classnames';

// Hooks
import authHeader from '../../../../services/auth-header';
import { useAuth } from '../../../../hooks/use-auth';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setErrorsReceipt,
  setResetReceipt,
  setMessageReceipt,
  setIsLoadingReceipt,
  setActiveReceipt,
} from '../../../../features/modal/receipt-productSlice';

//Styles
import styles from './MyModal-receiptProduct.module.scss';

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import MyInput from '../../Input/MyInput.jsx';
import MyButton from '../../Buttons/ButtonSend.jsx';
import Modal from '../MyModal2.jsx';

function ModalReceiptProduct() {
  const dispatch = useDispatch();
  const user = useAuth();

  // Redux
  const statusApp = useSelector((state) => state.appStatus);

  const active = useSelector((state) => state.modal_receipt_product.active);
  const errors = useSelector((state) => state.modal_receipt_product.errors);
  const message = useSelector((state) => state.modal_receipt_product.message);
  const reset = useSelector((state) => state.modal_receipt_product.reset);
  const isLoading = useSelector(
    (state) => state.modal_receipt_product.isLoading
  );

  //State

  const [category, setCategory] = useState([]);
  //const [validationCategory, setValidationCategory] = useState(true);

  const [warehouse, setWarehouse] = useState([]);
  const [validationWarehouse, setValidationWarehouse] = useState(true);

  const [product, setProduct] = useState([]);
  const [validationProduct, setValidationProduct] = useState(true);

  const [count, setCount] = useState('');
  const [validationCount, setValidationCount] = useState(true);

  // const [dropdownProduct, setDropdownProduct] = useState(null);

  // useEffect(() => {
  //   getDropdownProduct();
  // }, [category]);

  // const getDropdownProduct = () => {
  //   if (category.length !== 0) {
  //     setDropdownProduct (
  //       <>
  //         <h4>3. Выберите товар, на который необходимо оформить приход</h4>
  //         <MyDropdown
  //           id="receiptProductModal_product"
  //           title="Товар"
  //           placeholder="Выберите товар"
  //           multiple={false}
  //           changeValue={setProduct}
  //           validation={validationProduct}
  //           reset={reset}
  //           setReset={() => dispatch(setResetReceipt({ reset: false }))}
  //           url={`get_receipt_products/${category[0]?.id}`}
  //         />
  //       </>
  //     );
  //   }

  //   setDropdownProduct(null);
  // };

  return (
    <Modal
      active={active}
      setActive={() => {
        dispatch(setActiveReceipt({ active: false }));
      }}
      title="Приход товара"
      message={message}
      errors={errors}
      isLoading={isLoading}
      footer={'Данная форма предназначена для оформления прихода'}
    >
      <form className={styles.form}>
        <div className={styles.itemsContainer}>
          <h4>1. Выберите категорию</h4>
          <MyDropdown
            id="receiptProductModal_category"
            title="Категория"
            placeholder="Выберите категорию товара"
            multiple={false}
            changeValue={setCategory}
            validation={true}
            reset={reset}
            setReset={() => dispatch(setResetReceipt({ reset: false }))}
            url={'get_category'}
          />

          <h4>2. Выберите склад, на который осуществляется приход товара</h4>
          <MyDropdown
            id="receiptProductModal_warehouse"
            title="Склад"
            placeholder="Выберите склад"
            multiple={false}
            changeValue={setWarehouse}
            validation={validationWarehouse}
            reset={reset}
            setReset={() => dispatch(setResetReceipt({ reset: false }))}
            url={'get_warehouse'}
          />

          <h4>3. Выберите товар, на который необходимо оформить приход</h4>
          <MyDropdown
            id="receiptProductModal_product"
            title="Товар"
            placeholder="Выберите товар"
            multiple={false}
            changeValue={setProduct}
            validation={validationProduct}
            reset={reset}
            setReset={() => dispatch(setResetReceipt({ reset: false }))}
            url={category.length === 0 ? `get_receipt_products/0` : `get_receipt_products/${category[0]?.id}`}
          />
        </div>

        <div className={styles.buttons}>
          <MyButton
            type="clear"
            //action={resetForm}
            title="Сбросить"
            loadingTitle="Сбросить"
            loading={isLoading}
          />
          <MyButton
            type="send"
            // action={}
            title="Приход"
            loadingTitle="Сохраняю"
            loading={isLoading}
          />
        </div>
      </form>
    </Modal>
  );
}

export default ModalReceiptProduct;
