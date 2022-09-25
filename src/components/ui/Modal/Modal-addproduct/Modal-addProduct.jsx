import React, { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setErrors, setReset, setMessage, setIsLoading, setActive } from '../../../../features/modal/add-productSlice';

// Hooks
import authHeader from '../../../../services/auth-header';

//Styles
import styles from '../myModal.module.scss';

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import MyInput from '../../Input/MyInput.jsx';
import MyButton from '../../Buttons/ButtonSend.jsx';
import Modal from '../MyModal2.jsx';



function ModalAddProduct() {
  const dispatch = useDispatch();

  const active = useSelector((state) => state.modal_add_product.active);
  const errors = useSelector((state) => state.modal_add_product.errors);
  const message = useSelector((state) => state.modal_add_product.message);
  const reset = useSelector((state) => state.modal_add_product.reset);
  const isLoading = useSelector((state) => state.modal_add_product.isLoading);

  const [warehouse, setWarehouse] = useState([]);
  const [validationWarehouse, setValidationWarehouse] = useState(true);
  const [category, setCategory] = useState([]);
  const [validationCategory, setValidationCategory] = useState(true);
  const [product, setProduct] = useState('');
  const [validationProduct, setValidationProduct] = useState(true);
  const [serialNumber, setSerialNumber] = useState('');
  const [validationSerialNumber, setValidationSerialNumber] = useState(true);

  const resetForm = (e) => {
    e.preventDefault();

    setWarehouse([]);
    setValidationWarehouse(true);

    setCategory([]);
    setValidationCategory(true);

    setProduct('');
    setValidationProduct(true);

    setSerialNumber('');
    setValidationSerialNumber(true);

    dispatch( setMessage({message: ''}) );
    dispatch( setErrors({errors: false}) );
    dispatch( setReset({reset: true}) );
  };

  const resetValidation = () => {
    setValidationWarehouse(true);
    setValidationCategory(true);
    setValidationProduct(true);
    setValidationSerialNumber(true);

    dispatch( setMessage({message: ''}) );
    dispatch( setErrors({errors: false}) );
  };

  const validateAddForm = () => {
    resetValidation();

    const delSpaseStr = (str) => {
      return str.replace(/\s+/g, ' ').trim();
    };

    const validationItem = (item) => {
      return item.length === 0 ? false : true;
    };

    setProduct(delSpaseStr(product));
    setSerialNumber(delSpaseStr(serialNumber));

    let countError = 0;

    if (!validationItem(warehouse)) {
      setValidationWarehouse(false);
      countError++;
    }

    if (!validationItem(category)) {
      setValidationCategory(false);
      countError++;
    }

    if (!validationItem(product)) {
      setValidationProduct(false);
      countError++;
    }

    if (!validationItem(serialNumber)) {
      setValidationSerialNumber(false);
      countError++;
    }

    if (countError == 0) {
      return true;
    } else {

      dispatch( setMessage({message: `Заполните поля, количество ошибок: ${countError}`}) );
      dispatch( setErrors({errors: true}) );

      return false;
    }
  };

  const addProduct = (e) => {
    e.preventDefault();

    if (validateAddForm()) {
      dispatch( setIsLoading({isLoading: true}) );

      let myHeaders = new Headers();
      myHeaders.append('content-type', 'application/json');
      myHeaders.append('Authorization', `${authHeader()}`);

      let data = JSON.stringify({
        name: product,
        sn: serialNumber,
        warehouse: warehouse[0],
        category: category[0],
      });

      let requestOptions = {
        //mode: 'no-cors',
        method: 'POST',
        headers: myHeaders,
        body: data,
      };

      fetch('http://localhost:3001/api/addProduct', requestOptions)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            return res.json();
          } else {
            let error = new Error(res.statusText);
            error.response = res;
            throw error;
          }
        })
        .then((result) => {
          if (result.error) {
            dispatch( setMessage({message: result.error}) );
            dispatch( setErrors({errors: true}) );
          } else {
            dispatch( setMessage({message: result.message}) );
          }

          setTimeout(() => {
            dispatch( setIsLoading({isLoading: false}) );
          }, 100);
        })
        .catch((err) => {
          dispatch( setMessage({message: 'Ошибка сервера'}) );
          dispatch( setErrors({errors: true}) );
          dispatch( setIsLoading({isLoading: false}) );
        });
    }
  };

  return (
    <Modal
      active={active}
      setActive = { () => { dispatch( setActive({active: false}) ) } }
      title="Добавить товар"
      message={message}
      errors={errors}
      isLoading={isLoading}
    >
      <form className={styles.myModal_form}>
        <div className={styles.myModal_form_itemsContainer}>
          <MyDropdown
            id="addProductModal_warehouse"
            title="Склад"
            placeholder="Выберите склад"
            multiple={false}
            changeValue={setWarehouse}
            validation={validationWarehouse}
            reset={reset}
            setReset={() => dispatch( setReset({reset: false}) ) }
          />

          <MyDropdown
            id="addProductModal_category"
            title="Категория"
            placeholder="Выберите категорию"
            multiple={false}
            changeValue={setCategory}
            validation={validationCategory}
            reset={reset}
            setReset={() => dispatch( setReset({reset: false}) ) }
          />

          <MyInput
            type="text"
            title="Наименование"
            changeValue={setProduct}
            validation={validationProduct}
            value={product}
          />

          <MyInput
            tepe="text"
            title="S/N"
            changeValue={setSerialNumber}
            validation={validationSerialNumber}
            value={serialNumber}
          />
        </div>

        <div className={styles.myModal_form_buttons}>
          <MyButton
            type="clear"
            action={resetForm}
            title="Сбросить"
            loadingTitle="Сбросить"
            loading={isLoading}
          />
          <MyButton
            type="send"
            action={addProduct}
            title="Добавить"
            loadingTitle="Загрузка"
            loading={isLoading}
          />
        </div>
      </form>
    </Modal>
  );
}

export default ModalAddProduct;
