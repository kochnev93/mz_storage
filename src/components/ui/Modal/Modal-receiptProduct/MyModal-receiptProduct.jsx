import React, { useState, useEffect } from 'react';

// Hooks
import authHeader from '../../../../services/auth-header';
import useFetch from '../../../../hooks/useFetch';

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
import InputForSN from './InputForSN/InputForSN.jsx';
import { IoMdAddCircle } from 'react-icons/Io';

function ModalReceiptProduct() {
  const dispatch = useDispatch();

  // Redux
  const active = useSelector((state) => state.modal_receipt_product.active);
  const errors = useSelector((state) => state.modal_receipt_product.errors);
  const message = useSelector((state) => state.modal_receipt_product.message);
  const reset = useSelector((state) => state.modal_receipt_product.reset);
  const isLoading = useSelector(
    (state) => state.modal_receipt_product.isLoading
  );

  //State
  const [category, setCategory] = useState([]);

  const [warehouse, setWarehouse] = useState([]);
  const [validationWarehouse, setValidationWarehouse] = useState(true);

  const [product, setProduct] = useState([]);
  const [validationProduct, setValidationProduct] = useState(true);
  const [urlProduct, setUrlProduct] = useState(`get_receipt_products/0`);

  const [count, setCount] = useState(null);
  const [validationCount, setValidationCount] = useState(true);

  const [sn, setSn] = useState([]);
  const [inputSN, setInputSN] = useState('');
  const [validationSN, setValidationSN] = useState({
    status: true,
    message: null,
  });

  const [vendor, setVendor] = useState('');
  const [validationVendor, setValidationVendor] = useState(true);

  const [contract, setСontract] = useState('');
  const [validationСontract, setValidationСontract] = useState(true);

  const [url, setUrl] = useState('');
  const [validationUrl, setValidationUrl] = useState(true);

  const { fetchNow } = useFetch();

  useEffect(() => {
    setProduct([]);

    if (category.length) {
      setUrlProduct(`get_receipt_products/${category[0].id}`);
    } else {
      setUrlProduct(`get_receipt_products/0`);
    }
  }, [category]);

  const addReceipt = async (e) => {
    e.preventDefault();

    dispatch(setIsLoadingReceipt({ isLoading: true }));

    let data = JSON.stringify({
      warehouse: warehouse,
      product: product,
      sn: sn,
      count: count,
      contract: contract,
      url: url,
      vendor: vendor,
    });

    let requestOptions = {
      method: 'POST',
      body: data,
    };

    const result = await fetchNow(
      'http://localhost:3001/api/receipt_product',
      requestOptions
    );

    if (result.data) {
      dispatch(setMessageReceipt({ message: result.data }));
      setTimeout(() => {
        dispatch(setIsLoadingReceipt({ isLoading: false }));
      }, 100);

    } else {
      console.warn(result.error);
      dispatch(setMessageReceipt({ message: result.error }));
      dispatch(setErrorsReceipt({ errors: true }));
    }

    // fetch('http://localhost:3001/api/receipt_product', requestOptions)
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       let error = new Error(res.statusText);
    //       error.response = res;
    //       throw error;
    //     }
    //   })
    //   .then((result) => {
    //     if (result.error) {
    //       dispatch(setMessageReceipt({ message: result.error }));
    //       dispatch(setErrorsReceipt({ errors: true }));
    //     } else {
    //       dispatch(setMessageReceipt({ message: result.message }));
    //     }

    //     setTimeout(() => {
    //       dispatch(setIsLoadingReceipt({ isLoading: false }));
    //     }, 100);
    //   })
    //   .catch((err) => {
    //     dispatch(setMessageReceipt({ message: 'Ошибка сервера' }));
    //     dispatch(setErrorsReceipt({ errors: true }));
    //     dispatch(setIsLoadingReceipt({ isLoading: false }));
    //   });
  };

  const getComponentReceipt = () => {
    if (!product.length) {
      return <></>;
    }

    if (product[0].accounting_sn) {
      return (
        <>
          <h4>4. Введите серийные номера</h4>
          <p className={styles.info}>
            <strong>
              Внимание! По данному товару ведется серийный учет. <br />
            </strong>
            Введите серийный номер и нажите <IoMdAddCircle />, либо Enter
          </p>
          <InputForSN
            title="Серийный номер"
            type="text"
            changeValue={setInputSN}
            validation={validationSN}
            value={inputSN}
            addSN={addSerialNumber}
            deleteSN={deleteSerialNumber}
            sn={sn}
          />
        </>
      );
    } else {
      return (
        <>
          <h4>4. Введите количество</h4>
          <p className={styles.info}>
            <strong>
              Внимание! По данному товару не ведется серийный учет. <br />
            </strong>
            Введите количество
          </p>
          <MyInput
            type="number"
            title="Количество"
            changeValue={setCount}
            validation={validationCount}
            value={count}
          />
        </>
      );
    }
  };

  const addSerialNumber = (e) => {
    e.preventDefault();

    setValidationSN({
      status: true,
      message: null,
    });

    if (!sn.length) {
      setSn([...sn, inputSN]);
      setInputSN('');
      return;
    }

    let index = sn.findIndex((item) => item === inputSN);

    if (index === -1) {
      setSn([...sn, inputSN]);
      setInputSN('');
    } else {
      setValidationSN({
        status: false,
        message: 'Данный серийный номер уже введен',
      });
    }
  };

  const deleteSerialNumber = (e) => {
    e.stopPropagation();
    e.preventDefault();

    let newState = sn.filter((item) => {
      return item !== e.target.dataset.value;
    });

    setSn(newState);
  };

  const resetForm = (e) => {
    e.preventDefault();

    setCategory([]);
    setWarehouse([]);
    setProduct([]);
    setCount(null);
    setSn([]);
    setInputSN('');
    setVendor('');
    setСontract('');
    setUrl('');

    dispatch(setMessageReceipt({ message: '' }));
    dispatch(setErrorsReceipt({ errors: false }));
    dispatch(setResetReceipt({ reset: true }));
  };

  const resetValidation = () => {};

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
          <div className={styles.item}>
            <h4>1. Выберите категорию</h4>
            <MyDropdown
              id="receiptProductModal_category"
              title="Категория"
              placeholder="Категория товара"
              multiple={false}
              changeValue={setCategory}
              validation={true}
              reset={reset}
              setReset={() => dispatch(setResetReceipt({ reset: false }))}
              url={'get_category'}
            />
          </div>

          <div className={styles.item}>
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
          </div>

          <div className={styles.item}>
            <h4>3. Выберите товар, на который необходимо оформить приход</h4>
            <MyDropdown
              id="receiptProductModal_product"
              title="Товар"
              placeholder="Выберите товар"
              multiple={false}
              validation={true}
              changeValue={setProduct}
              url={urlProduct}
            />
          </div>

          <div className={styles.item}>{getComponentReceipt()}</div>

          {product.length !== 0 && (
            <>
              <div className={styles.item}>
                <h4>5. Введите номер счета или УПД</h4>
                <MyInput
                  type="text"
                  title="Номер счета"
                  changeValue={setСontract}
                  validation={validationСontract}
                  value={contract}
                />
              </div>

              <div className={styles.item}>
                <h4>6. Введите наименование контрагента</h4>
                <MyInput
                  type="text"
                  title="Контрагент"
                  changeValue={setVendor}
                  validation={validationVendor}
                  value={vendor}
                />
              </div>

              <div className={styles.item}>
                <h4>7. Введите ссылка на задачу в МП (опционально)</h4>
                <MyInput
                  type="url"
                  title="Ссылка на задачу в МП"
                  changeValue={setUrl}
                  validation={validationUrl}
                  value={url}
                />
              </div>
            </>
          )}
        </div>

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
            action={addReceipt}
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
