import React, {useState} from 'react';
import cx from 'classnames';

//Styles
import styles from './myModal.module.scss';
import { AiOutlineClose } from 'react-icons/Ai';

// Components
import MyDropdown from './../Dropdown/MyDropdown.jsx';
import MyInput from './../Input/MyInput.jsx';
import ButtonSend from '../Buttons/ButtonSend.jsx';

function Modal({ active, setActive }) {
  const [errors, setErrors] = useState(false);
  const [message, setMessage] = useState('');

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
  }

  const resetValidation = () => {
    setValidationWarehouse(true);
    setValidationCategory(true);
    setValidationProduct(true);
    setValidationSerialNumber(true);
    setErrors(false);
    setMessage('');
  }

  const validateAddForm = () => {
    resetValidation();

    const delSpaseStr = (str) =>{
      return str.replace(/\s+/g, ' ').trim();
    }
    
    const validationItem = (item) => {
      return item.length === 0 ? false : true;
    }

    setProduct( delSpaseStr(product) );
    setSerialNumber( delSpaseStr(serialNumber) );

    let countError = 0;

    if( !validationItem(warehouse) ){
      setValidationWarehouse(false);
      countError++;
    }

    if( !validationItem(category) ){
      setValidationCategory(false);
      countError++;
    }


    if( !validationItem(product) ){
      setValidationProduct(false);
      countError++;
    }

    if( !validationItem(serialNumber) ){
      setValidationSerialNumber(false);
      countError++;
    }

    if ( countError == 0 ){
      console.log('Отправлено')
    } else{
      setErrors(true);
      setMessage(`Заполните поля, количество ошибок: ${countError}`)
      console.log('Ошибка');
    }
    
  }

  const addProduct = (e) => {
    e.preventDefault();
    validateAddForm();
  }

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
              <div className={styles.myModal_message}>
                {message}
              </div>

              <AiOutlineClose
                className={styles.close_icon}
                onClick={() => setActive(false)}
              />
          </div>
          </div>

          <div className={styles.myModal_body}>
            <form className={styles.myModal_form}>
              <div className={styles.myModal_form_itemsContainer}>

                  <MyDropdown
                    id="warehouse"
                    title="Склад"
                    placeholder="Выберите склад"
                    multiple={false}
                    changeValue = {setWarehouse}
                    validation = {validationWarehouse}
                  />

                  <MyDropdown
                    id="category"
                    title="Категория"
                    placeholder="Выберите категорию"
                    multiple={false}
                    changeValue = {setCategory}
                    validation = {validationCategory}
                  />

                  <MyInput
                    type="text" 
                    title="Наименование"
                    changeValue={setProduct}
                    validation = {validationProduct}
                    value = {product}
                  />

                  <MyInput 
                    tepe="text"
                    title="S/N"
                    changeValue={setSerialNumber}
                    validation = {validationSerialNumber}
                    value = {serialNumber}
                  />

              </div>

              <div className={styles.myModal_form_buttons}>

                <input
                  type="reset"
                  value="Очистить"
                  onClick={resetForm}
                />
                <ButtonSend send={addProduct} title="Добавить" />
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
