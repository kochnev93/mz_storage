import React, { useState, useEffect } from 'react';

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
import styles from './Modal-addProduct.module.scss';

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import MyInput from '../../Input/MyInput.jsx';
import MyButton from '../../Buttons/ButtonSend.jsx';
import Modal from '../MyModal2.jsx';
import Checkbox from '../../Checkbox/Checkbox.jsx';
import { Property } from './Property/Property.jsx';

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


  // const [property, setProperty] = useState(
  //   [
  //     {
  //       id: 1,
  //       title: 'Цвет',
  //       value: [
  //         {
  //           id: 5,
  //           title: 'Белый',
  //           isCheked: false
  //         },
  //         {
  //           id: 6,
  //           title: 'Черный',
  //           isCheked: false
  //         }
  //       ],
  //     },
  //     {
  //       id: 2,
  //       title: 'Диагональ',
  //       value: [
  //         {
  //           id: 7,
  //           title: '23.8',
  //           isCheked: false
  //         },
  //         {
  //           id: 8,
  //           title: '27',
  //           isCheked: false
  //         }
  //       ],
  //     },
  //     {
  //       id: 3,
  //       title: 'Видеовыход',
  //       value: [
  //         {
  //           id: 9,
  //           title: 'HDMI',
  //           isCheked: false
  //         },
  //         {
  //           id: 10,
  //           title: 'VGA',
  //           isCheked: false
  //         }
  //       ],
  //     },
  //     {
  //       id: 3,
  //       title: 'Видеовыход',
  //       value: [
  //         {
  //           id: 11,
  //           title: 'HDMI',
  //           isCheked: false
  //         },
  //         {
  //           id: 12,
  //           title: 'VGA',
  //           isCheked: false
  //         }
  //       ],
  //     },
  //     {
  //       id: 3,
  //       title: 'Видеовыход',
  //       value: [
  //         {
  //           id: 13,
  //           title: 'HDMI',
  //           isCheked: false
  //         },
  //         {
  //           id: 14,
  //           title: 'VGA',
  //           isCheked: false
  //         }
  //       ],
  //     },
  //     {
  //       id: 3,
  //       title: 'Видеовыход',
  //       value: [
  //         {
  //           id: 15,
  //           title: 'HDMI',
  //           isCheked: false
  //         },
  //         {
  //           id: 16,
  //           title: 'VGA',
  //           isCheked: false
  //         }
  //       ],
  //     },
  //     {
  //       id: 3,
  //       title: 'Видеовыход',
  //       value: [
  //         {
  //           id: 17,
  //           title: 'HDMI',
  //           isCheked: false
  //         },
  //         {
  //           id: 18,
  //           title: 'VGA',
  //           isCheked: false
  //         }
  //       ],
  //     },
  //   ]
  // );

  const [property, setProperty] = useState([]);

  
  useEffect(() => {
    if(category.length !== 0){
      fetch(`http://localhost:3001/api/get_property/${category[0].id}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(res.statusText);
          }
        })
        .then((result) => {
          setProperty(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [category]);


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

    setProperty([]);

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

  const validateAddForm = async() => {
    resetValidation();

    const delSpaseStr = (str) => {
      return str.replace(/\s+/g, ' ').trim();
    };

    const validationItem = (item) => {
      return item.length === 0 ? false : true;
    };

    await setProduct(delSpaseStr(product));
    await setComment(delSpaseStr(comment));

    let countError = 0;

    if (!validationItem(category)) {
      setValidationCategory(false);
      countError++;
    }

    if (!validationItem(unit)) {
      setValidationUnit(false);
      countError++;
    }

    if (!validationItem(product)) {
      setValidationProduct(false);
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

    if ( validateAddForm() ) {
      dispatch(setIsLoading({ isLoading: true }));

      let myHeaders = new Headers();
      myHeaders.append('content-type', 'application/json');
      myHeaders.append('Authorization', `${authHeader()}`);

      const selectedProperty = property.filter(item => item.value)

      let data = JSON.stringify({
        name: product,
        comment: comment,
        category: category[0],
        unit: unit[0],
        snAccounting: snAccounting,
        property: property
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
      title="Добавить товар в номенклатуру"
      message={message}
      errors={errors}
      isLoading={isLoading}
      footer={'Данная форма предназначена для добавления товара в номенклатуру'}
    >
      <form className={styles.form}>
        <h4>Основная информация</h4>
        <div className={styles.itemsContainer}>
          <MyDropdown
            id="addProductModal_category"
            title="Категория"
            placeholder="Выберите категорию"
            multiple={false}
            changeValue={setCategory}
            validation={validationCategory}
            reset={reset}
            setReset={() => dispatch(setReset({ reset: false }))}
            url={'get_category'}
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
            url={'get_unit'}
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

        <div className={styles.warning}>
          {snAccounting &&
            'Внимание! После установки данного флага будет невозможно вернуть его обратно. При установленном флаге учет товара будет производиться по серийным номерам'}
        </div>

        {category.length !== 0 ? <Property property={property} changeValue={setProperty} /> : null }

        {/* <Property property={property} changeValue={setProperty} /> */}

        <div className={styles.buttons}>
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
