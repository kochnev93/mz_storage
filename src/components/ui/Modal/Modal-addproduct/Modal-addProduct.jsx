import React, { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setErrors,
  setReset,
  setMessage,
  setIsLoading,
  setActive,
} from '../../../../features/modal/add-productSlice';

// Hooks
import authHeader from '../../../../services/auth-header';

//Styles
import styles from '../myModal.module.scss';
import styles2 from './Modal-addProduct.module.scss';

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import MyInput from '../../Input/MyInput.jsx';
import MyButton from '../../Buttons/ButtonSend.jsx';
import Modal from '../MyModal2.jsx';
import Checkbox from '../../Checkbox/Checkbox.jsx';

function ModalAddProduct() {
  const dispatch = useDispatch();

  const active = useSelector((state) => state.modal_add_product.active);
  const errors = useSelector((state) => state.modal_add_product.errors);
  const message = useSelector((state) => state.modal_add_product.message);
  const reset = useSelector((state) => state.modal_add_product.reset);
  const isLoading = useSelector((state) => state.modal_add_product.isLoading);

  const [category, setCategory] = useState([]);
  const [validationCategory, setValidationCategory] = useState(true);

  const [unit, setUnit] = useState([]);
  const [validationUnit, setValidationUnit] = useState(true);

  const [product, setProduct] = useState('');
  const [validationProduct, setValidationProduct] = useState(true);

  const [comment, setComment] = useState('');
  const [validationComment, setValidationComment] = useState(true);

  const [snAccounting, setSnAccounting] = useState(false);

  const resetForm = (e) => {
    e.preventDefault();

    setUnit([]);
    setValidationUnit(true);

    setCategory([]);
    setValidationCategory(true);

    setProduct('');
    setValidationProduct(true);

    setComment('');
    setValidationComment(true);

    dispatch(setMessage({ message: '' }));
    dispatch(setErrors({ errors: false }));
    dispatch(setReset({ reset: true }));
  };

  const resetValidation = () => {
    setValidationUnit(true);
    setValidationCategory(true);
    setValidationProduct(true);
    setValidationComment(true);

    dispatch(setMessage({ message: '' }));
    dispatch(setErrors({ errors: false }));
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
    setComment(delSpaseStr(comment));

    let countError = 0;

    if (!validationItem(category)) {
      setValidationCategory(false);
      countError++;
    }

    if (!validationItem(product)) {
      setValidationProduct(false);
      countError++;
    }

    if (!validationItem(comment)) {
      setValidationComment(false);
      countError++;
    }

    if (countError == 0) {
      return true;
    } else {
      dispatch(
        setMessage({
          message: `Заполните поля, количество ошибок: ${countError}`,
        })
      );
      dispatch(setErrors({ errors: true }));

      return false;
    }
  };

  const addProduct = (e) => {
    e.preventDefault();

    if (validateAddForm()) {
      dispatch(setIsLoading({ isLoading: true }));

      let myHeaders = new Headers();
      myHeaders.append('content-type', 'application/json');
      myHeaders.append('Authorization', `${authHeader()}`);

      let data = JSON.stringify({
        name: product,
        sn: comment,
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
            dispatch(setMessage({ message: result.error }));
            dispatch(setErrors({ errors: true }));
          } else {
            dispatch(setMessage({ message: result.message }));
          }

          setTimeout(() => {
            dispatch(setIsLoading({ isLoading: false }));
          }, 100);
        })
        .catch((err) => {
          dispatch(setMessage({ message: 'Ошибка сервера' }));
          dispatch(setErrors({ errors: true }));
          dispatch(setIsLoading({ isLoading: false }));
        });
    }
  };

  return (
    <Modal
      active={active}
      setActive={() => {
        dispatch(setActive({ active: false }));
      }}
      title="Добавить товар"
      message={message}
      errors={errors}
      isLoading={isLoading}
    >
      <form className={styles.myModal_form}>
        <div className={styles.myModal_form_itemsContainer}>
          <MyDropdown
            id="addProductModal_category"
            title="Категория"
            placeholder="Выберите категорию"
            multiple={false}
            changeValue={setCategory}
            validation={validationCategory}
            reset={reset}
            setReset={() => dispatch(setReset({ reset: false }))}
          />

          <MyDropdown
            id="addProductModal_unit"
            title="Единица измерения"
            placeholder="Единица измерения"
            multiple={false}
            changeValue={setUnit}
            validation={validationUnit}
            reset={reset}
            setReset={() => dispatch(setReset({ reset: false }))}
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
            title="Комментарий"
            changeValue={setComment}
            validation={validationComment}
            value={comment}
          />

          <Checkbox
            id="sn_accounting"
            title="Серийный учет"
            onChange={setSnAccounting}
            checked={snAccounting}
          />
        </div>

        <div className={styles2.warning}>
          {snAccounting &&
            'Внимание! Вы активировали серийный учет для данного товара. Изменить эту опцию далее будет невозможно.'}
        </div>

        <div>
          <h4>Характеристики</h4>
          <p>Заполните характеристики товара:</p>

          <MyInput
            tepe="text"
            title="Диагональ"
            changeValue={setComment}
            validation={validationComment}
            value={comment}
          />

          <MyInput
            tepe="text"
            title="Цвет"
            changeValue={setComment}
            validation={validationComment}
            value={comment}
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
