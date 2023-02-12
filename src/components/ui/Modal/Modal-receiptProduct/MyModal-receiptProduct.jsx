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
  setDefaultReceipt,
  setActiveReceipt,
  setProduct,
  setProductUrl,
  setInputSN,
  setCount,
  setMinCount,
  setValidation,
  setSN,
  setCategory,
  setWarehouse,
  setContract,
  setContractCheckbox,
  setContragent,
  setContragentCheckbox,
  setNewContragentName,
  setNewContragentINN,
  setURL,
  setGuarantee,
  setGuaranteeCheckbox,
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
import Checkbox from '../../Checkbox/Checkbox.jsx';

function ModalReceiptProduct() {
  const dispatch = useDispatch();
  const { fetchNow } = useFetch();

  // Redux Modal
  // const active = useSelector((state) => state.modal_receipt_product.active);
  // const errors = useSelector((state) => state.modal_receipt_product.errors);
  // const message = useSelector((state) => state.modal_receipt_product.message);
  // const reset = useSelector((state) => state.modal_receipt_product.reset);
  // const isLoading = useSelector(
  //   (state) => state.modal_receipt_product.isLoading
  // );

  const {
    active,
    errors,
    message,
    reset,
    isLoading
  } = useSelector((state) => state.modal_receipt_product.isLoading);

  // Redux Form
  // const category = useSelector((state) => state.modal_receipt_product.category);
  // const warehouse = useSelector(
  //   (state) => state.modal_receipt_product.warehouse
  // );
  // const product = useSelector((state) => state.modal_receipt_product.product);
  // const urlProduct = useSelector(
  //   (state) => state.modal_receipt_product.urlProduct
  // );
  // const count = useSelector((state) => state.modal_receipt_product.count);
  // const min_count = useSelector(
  //   (state) => state.modal_receipt_product.min_count
  // );
  // const guarantee = useSelector(
  //   (state) => state.modal_receipt_product.guarantee
  // );
  // const guaranteeCheckbox = useSelector(
  //   (state) => state.modal_receipt_product.guaranteeCheckbox
  // );
  // const contract = useSelector((state) => state.modal_receipt_product.contract);
  // const contractCheckbox = useSelector(
  //   (state) => state.modal_receipt_product.contractCheckbox
  // );
  // const sn = useSelector((state) => state.modal_receipt_product.sn);
  // const inputSN = useSelector((state) => state.modal_receipt_product.inputSN);
  // const contragent = useSelector(
  //   (state) => state.modal_receipt_product.contragent
  // );
  // const contragentCheckbox = useSelector(
  //   (state) => state.modal_receipt_product.contragentCheckbox
  // );
  // const newContragentName = useSelector(
  //   (state) => state.modal_receipt_product.newContragentName
  // );
  // const newContragentINN = useSelector(
  //   (state) => state.modal_receipt_product.newContragentINN
  // );
  // const url = useSelector((state) => state.modal_receipt_product.url);
  // const validation = useSelector(
  //   (state) => state.modal_receipt_product.validation
  // );

  const {
    category,
    warehouse,
    product,
    urlProduct,
    count,
    min_count,
    guarantee,
    guaranteeCheckbox,
    contract,
    contractCheckbox,
    sn,
    inputSN,
    contragent,
    contragentCheckbox,
    newContragentName,
    newContragentINN,
    url,
    validation,
  } = useSelector((state) => state.modal_receipt_product);

  //State
  //const [category, setCategory] = useState([]);

  //const [warehouse, setWarehouse] = useState([]);
  //const [validationWarehouse, setValidationWarehouse] = useState(true);

  //const [product, setProduct] = useState([]);
  //const [validationProduct, setValidationProduct] = useState(true);
  //const [urlProduct, setUrlProduct] = useState(`get_receipt_products/0`);

  // const [count, setCount] = useState(null);
  // const [validationCount, setValidationCount] = useState(true);

  //const [guarantee, setGuarantee] = useState(null);
  //const [validationGuarantee, setValidationGuarantee] = useState(false);
  //const [guaranteeCheckbox, setGuaranteeCheckbox] = useState(false);

  //const [dogovorCheckbox, setDogovorCheckbox] = useState(false);

  // const [sn, setSn] = useState([]);
  // const [inputSN, setInputSN] = useState('');
  // const [validationSN, setValidationSN] = useState({
  //   status: true,
  //   message: null,
  // });

  // const [contragent, setContragent] = useState([]);
  // const [validationContragent, setValidationContragent] = useState(true);
  // const [contragentCheckbox, setContragentCheckbox]= useState(false);
  // const [newContragent, setNewContragent] = useState(null);

  // const [contract, setСontract] = useState('');
  // const [validationСontract, setValidationСontract] = useState(true);

  // const [url, setUrl] = useState('');
  // const [validationUrl, setValidationUrl] = useState(true);

  useEffect(() => {
    //dispatch(setProduct({ product: [] }));

    if (category?.length) {
      dispatch(
        setProductUrl({ urlProduct: `get_receipt_products/${category[0].id}` })
      );
    } else {
      dispatch(setProductUrl({ urlProduct: `get_receipt_products/0` }));
    }
  }, [category]);

  const validationReceipt = () => {
    dispatch(setDefaultReceipt());

    let errorCounter = 0;

    const tempValidation = JSON.parse(JSON.stringify(validation));

    if (product.length == 0) {
      tempValidation.product = false;
      errorCounter++;

      dispatch(setValidation({ ...tempValidation }));
      dispatch(
        setMessageReceipt({
          errors: true,
          message: `Количество ошибок: ${errorCounter}`,
        })
      );

      return false;
    } else {
      tempValidation.product = true;
    }

    if (warehouse.length == 0) {
      tempValidation.warehouse = false;
      errorCounter++;
    } else {
      tempValidation.warehouse = true;
    }

    // Серийный учет
    if (product[0]?.accounting_sn && sn.length == 0) {
      tempValidation.sn.status = false;
      tempValidation.sn.message = 'Введите серийный номер(а)';
      errorCounter++;
    } else {
      tempValidation.sn.status = true;
      tempValidation.sn.message = null;
    }

    // Не серийный учет
    if (!product[0]?.accounting_sn && !count) {
      tempValidation.count = false;
      errorCounter++;
    } else {
      tempValidation.count = true;
    }

    // Не серийный учет
    if (!product[0]?.accounting_sn && !min_count) {
      tempValidation.min_count = false;
      errorCounter++;
    } else {
      tempValidation.min_count = true;
    }

    if (!contract) {
      if (!contractCheckbox) {
        console.log('++++');
        tempValidation.contract = false;
        errorCounter++;
      } else {
        tempValidation.contract = true;
      }
    } else {
      tempValidation.contract = true;
    }

    if (contragent.length == 0) {
      if (!contragentCheckbox) {
        tempValidation.contragent = false;
        errorCounter++;
      } else {
        tempValidation.contragent = true;
      }
    }

    if (contragentCheckbox && !newContragentName) {
      tempValidation.newContragentName = false;
      errorCounter++;
    } else {
      tempValidation.newContragentName = true;
    }

    if (contragentCheckbox && !newContragentINN) {
      tempValidation.newContragentINN = false;
      errorCounter++;
    } else {
      tempValidation.newContragentINN = true;
    }

    if (!guarantee) {
      if (!guaranteeCheckbox) {
        tempValidation.guarantee = false;
        errorCounter++;
      } else {
        tempValidation.guarantee = true;
      }
    } else {
      tempValidation.guarantee = true;
    }

    if (errorCounter === 0) {
      return true;
    } else {
      dispatch(setValidation({ ...tempValidation }));
      dispatch(
        setMessageReceipt({
          errors: true,
          message: `Количество ошибок: ${errorCounter}`,
        })
      );
      return false;
    }
  };

  const addReceipt = async (e) => {
    e.preventDefault();

    if (validationReceipt()) {
      dispatch(setIsLoadingReceipt({ isLoading: true }));

      let data = JSON.stringify({
        warehouse: warehouse[0],
        product: product[0],
        contract: contractCheckbox ? null : contract,
        contragent: contragentCheckbox ? null : contragent[0],
        newContragentName: contragentCheckbox ? newContragentName : null,
        newContragentINN: contragentCheckbox ? newContragentINN : null,
        url: url,
        guarantee: guaranteeCheckbox ? null : guarantee,
        count: count,
        sn: sn,
      });

      let requestOptions = {
        method: 'POST',
        body: data,
      };
    } else {
      return false;
    }

    // const result = await fetchNow(
    //   `${process.env.REACT_APP_API_SERVER}/receipt_product`,
    //   requestOptions
    // );

    // if (result.data) {
    //   dispatch(setMessageReceipt({ message: result.data }));
    //   setTimeout(() => {
    //     dispatch(setIsLoadingReceipt({ isLoading: false }));
    //   }, 100);
    // } else {
    //   console.warn(result.error);
    //   dispatch(setMessageReceipt({ message: result.error }));
    //   dispatch(setErrorsReceipt({ errors: true }));
    // }
  };

  const getComponentReceipt = () => {
    if (!product?.length) {
      return <></>;
    }

    if (product[0].accounting_sn) {
      return (
        <div className={styles.item}>
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
            changeValue={(value) => {
              dispatch(setInputSN({ inputSN: value }));
            }}
            validation={validation.sn}
            value={inputSN}
            addSN={addSerialNumber}
            deleteSN={deleteSerialNumber}
            sn={sn}
          />
        </div>
      );
    } else {
      return (
        <>
          <div className={styles.item}>
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
              changeValue={(value) => {
                dispatch(setCount({ count: value }));
              }}
              validation={validation.count}
              value={count}
            />
          </div>

          <div className={styles.item}>
            <h4>4.1. Введите минимальный остаток</h4>
            <p className={styles.description}>
              При достижении минмального остатка будет сформировано уведомление
            </p>
            <MyInput
              type="number"
              title="Минимальный остаток"
              changeValue={(value) => {
                dispatch(setMinCount({ min_count: value }));
              }}
              validation={validation.min_count}
              value={min_count}
            />
          </div>
        </>
      );
    }
  };

  const addSerialNumber = (e) => {
    e.preventDefault();

    dispatch(
      setValidation({
        ...validation,
        sn: {
          status: true,
          message: null,
        },
      })
    );

    // setValidationSN({
    //   status: true,
    //   message: null,
    // });

    if (!sn?.length) {
      dispatch(setSN({ sn: [...sn, inputSN] }));
      // setSn([...sn, inputSN]);
      dispatch(setInputSN({ inputSN: '' }));
      //setInputSN('');
      return;
    }

    let index = sn.findIndex((item) => item === inputSN);

    if (index === -1) {
      dispatch(setSN({ sn: [...sn, inputSN] }));
      //setSn([...sn, inputSN]);
      dispatch(setInputSN({ inputSN: '' }));
      //setInputSN('');
    } else {
      // setValidationSN({
      //   status: false,
      //   message: 'Данный серийный номер уже введен',
      // });
      dispatch(
        setValidation({
          validation: {
            ...validation,
            sn: {
              status: false,
              message: 'Данный серийный номер уже введен',
            },
          },
        })
      );
    }
  };

  const deleteSerialNumber = (e) => {
    e.stopPropagation();
    e.preventDefault();

    let newState = sn.filter((item) => {
      return item !== e.target.dataset.value;
    });

    //setSn(newState);
    dispatch(setSN({ sn: newState }));
  };

  const resetForm = (e) => {
    e.preventDefault();

    // setCategory([]);
    // setWarehouse([]);
    // setProduct([]);
    // setCount(null);
    // setSn([]);
    // setInputSN('');
    // setVendor('');
    // setСontract('');
    // setUrl('');

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
            <p className={styles.description}>
              Поможет отфильтровать товары по Категории. Если не выбрать, то в
              п.2 будут выводиться все позиции номенклатуры
            </p>
            <MyDropdown
              id="receiptProductModal_category"
              title="Категория"
              placeholder="Категория товара"
              multiple={false}
              changeValue={(res) => {
                dispatch(setCategory(res));
              }}
              validation={true}
              reset={reset}
              setReset={() => dispatch(setResetReceipt({ reset: false }))}
              url={'get_category'}
            />
          </div>

          <div className={styles.item}>
            <h4>2. Выберите позицию из номенклатуры</h4>
            <MyDropdown
              id="receiptProductModal_product"
              title="Товар"
              placeholder="Выберите товар"
              multiple={false}
              validation={validation.product}
              changeValue={(res) => {
                dispatch(setProduct(res));
              }}
              url={urlProduct}
            />
          </div>

          <div className={styles.item}>
            <h4>3. Выберите склад</h4>
            <p className={styles.description}>
              На данный склад будет оформлен Приход
            </p>
            <MyDropdown
              id="receiptProductModal_warehouse"
              title="Склад"
              placeholder="Выберите склад"
              multiple={false}
              changeValue={(res) => {
                dispatch(setWarehouse(res));
              }}
              validation={validation.warehouse}
              reset={reset}
              setReset={() => dispatch(setResetReceipt({ reset: false }))}
              url={'get_warehouse'}
            />
          </div>

          {getComponentReceipt()}

          {product.length !== 0 && (
            <>
              <div className={styles.item}>
                <h4>5. Номер счета, УПД</h4>
                <p className={styles.description}>
                  Пример: E-00543792 от 29.12.2022
                </p>
                <MyInput
                  type="text"
                  title="Номер счета"
                  changeValue={(value) => {
                    dispatch(setContract({ contract: value }));
                  }}
                  validation={validation.contract}
                  value={contract}
                  disabled={contractCheckbox}
                />

                <div className={styles.guaranteeCheckbox}>
                  <Checkbox
                    id="contract"
                    title="Номер счета неизвестен/утерян"
                    onChange={() => {
                      dispatch(setContractCheckbox());
                    }}
                    checked={contractCheckbox}
                  />
                </div>
              </div>

              <div className={styles.item}>
                <h4>6. Контрагент</h4>

                <MyDropdown
                  id="receiptProductModal_contragent"
                  title="Контрагент"
                  placeholder="Контрагент"
                  multiple={false}
                  changeValue={(res) => {
                    dispatch(setContragent(res));
                  }}
                  validation={validation.contragent}
                  reset={reset}
                  setReset={() => dispatch(setResetReceipt({ reset: false }))}
                  url={'get_contragents'}
                  disabled={contragentCheckbox}
                />

                <div className={styles.guaranteeCheckbox}>
                  <Checkbox
                    id="contragent"
                    title="Контрагента нет в списке"
                    onChange={() => {
                      dispatch(setContragentCheckbox());
                    }}
                    checked={contragentCheckbox}
                  />
                </div>

                {contragentCheckbox && (
                  <>
                    <div className={styles.new_item}>
                      <h6>Введите наименование нового Контрагента</h6>
                      <p className={styles.description}>
                        Пример: ООО "ДНС-Ритейл"
                      </p>
                      <MyInput
                        type="text"
                        title="Контрагент"
                        changeValue={(value) => {
                          dispatch(setNewContragentName({ name: value }));
                        }}
                        validation={validation.newContragentName}
                        value={newContragentName}
                      />
                    </div>

                    <div className={styles.new_item}>
                      <h6>Введите ИНН нового Контрагента</h6>
                      <p className={styles.description}> Пример: 2540167061</p>
                      <MyInput
                        type="number"
                        title="ИНН"
                        changeValue={(value) => {
                          dispatch(setNewContragentINN({ inn: value }));
                        }}
                        validation={validation.newContragentINN}
                        value={newContragentINN}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className={styles.item}>
                <h4>7. Ссылка</h4>
                <p className={styles.description}>
                  Ссылка на задачу в МП (опционально)
                </p>
                <MyInput
                  type="url"
                  title="URL"
                  changeValue={(value) => {
                    dispatch(setURL({ url: value }));
                  }}
                  validation={validation.url}
                  value={url}
                />
              </div>

              <div className={styles.item}>
                <h4>8. Гарантия</h4>
                <p className={styles.description}>
                  Выберите дату окончания гарантии, если товар не на гарантии,
                  то выберите соответствующий пункт
                </p>
                <MyInput
                  type="date"
                  title="Гарантия"
                  changeValue={(value) => {
                    dispatch(setGuarantee({ guarantee: value }));
                  }}
                  validation={validation.guarantee}
                  value={guarantee}
                  disabled={guaranteeCheckbox}
                />

                <div className={styles.guaranteeCheckbox}>
                  <Checkbox
                    id="guarantee"
                    title="Не на гарантии"
                    onChange={() => {
                      dispatch(setGuaranteeCheckbox());
                    }}
                    checked={guaranteeCheckbox}
                  />
                </div>
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
