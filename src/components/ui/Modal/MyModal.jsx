import React, { useState } from 'react';
import cx from 'classnames';
import authHeader from '../../../services/auth-header';

//Styles
import styles from './myModal.module.scss';
import { AiOutlineClose } from 'react-icons/Ai';

// Components
import MyDropdown from './../Dropdown/MyDropdown.jsx';
import MyInput from './../Input/MyInput.jsx';
import MyButton from '../Buttons/ButtonSend.jsx';


function Modal({ active, setActive }) {
  const [errors, setErrors] = useState(false);
  const [message, setMessage] = useState('');
  const [reset, setReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

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

    setErrors(false);
    setMessage('');
    setReset(true);
  };

  const resetValidation = () => {
    setValidationWarehouse(true);
    setValidationCategory(true);
    setValidationProduct(true);
    setValidationSerialNumber(true);
    setErrors(false);
    setMessage('');
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
      setErrors(true);
      setMessage(`Заполните поля, количество ошибок: ${countError}`);
      return false;
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (validateAddForm()) {
      setIsLoading(true);
      let myHeaders = new Headers();
      myHeaders.append('content-type', 'application/json');
      myHeaders.append('Authorization', `${ authHeader() }`);

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
            setErrors(true);
            setMessage(result.error);
          } else {
            setMessage(result.message);
          }

          setTimeout(() => {
            setIsLoading(false);
            console.log('load end')
          }, 100);

        })
        .catch((err) => {
          setErrors(true);
          setIsLoading(false);
          setMessage(`Ошибка сервера`);
        });
    }
    
  };

  return (
    <div
      className={cx(styles.myModal_overlay, { [styles.active]: active })}
      onClick={() => setActive(false)}
    >
      <div className={styles.myModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.myModal_wrapper}>
          <div className={styles.myModal_header}>
            <div>Добавить товар</div>

            <div className={styles.myModal_toolbar}>
              <div
                className={cx(styles.myModal_message, {
                  [styles.succses]: !errors,
                  [styles.error]: errors,
                })}
              >
                {message}
              </div>

              <AiOutlineClose
                className={styles.close_icon}
                onClick={() => setActive(false)}
              />
            </div>
          </div>

          <div
            className={cx(styles.myModal_body, { [styles.loading]: isLoading })}
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
                  setReset={setReset}
                />

                <MyDropdown
                  id="addProductModal_category"
                  title="Категория"
                  placeholder="Выберите категорию"
                  multiple={false}
                  changeValue={setCategory}
                  validation={validationCategory}
                  reset={reset}
                  setReset={setReset}
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
                  loading = {isLoading}
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
          </div>

          <div className={styles.myModal_footer}>
            Данная форма предназначена для добавления товара в номенклатуру. Для
            оформления прихода воспользуйтесь другой формой.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
