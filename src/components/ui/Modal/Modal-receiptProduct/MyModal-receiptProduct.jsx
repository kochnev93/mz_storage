import React, { useEffect } from 'react';

// Hooks
import useFetch from '../../../../hooks/useFetch';
import { validationReceiptForm } from './validationReceipt.js';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setErrorsReceipt,
  setResetReceipt,
  setMessageReceipt,
  setIsLoadingReceipt,
  setDefaultReceipt,
  setDefaultValue,
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
import { IoMdAddCircle } from 'react-icons/Io';

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import MyInput from '../../Input/MyInput.jsx';
import MyButton from '../../Buttons/ButtonSend.jsx';
import Modal from '../MyModal2.jsx';
import InputForSN from './InputForSN/InputForSN.jsx';
import Checkbox from '../../Checkbox/Checkbox.jsx';


function ModalReceiptProduct() {
  const dispatch = useDispatch();
  const { fetchNow } = useFetch();

  const {
    active,
    errors,
    message,
    reset,
    isLoading
  } = useSelector((state) => state.modal_receipt_product);

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

  useEffect(() => {
    dispatch(setProduct([]));

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

    // Делаем копию текущего состояния
    const tempValidation = JSON.parse(JSON.stringify(validation));

    // Объект со значениями полей
    const values = {
      product,
      warehouse,
      count,
      min_count,
      sn,
      guarantee,
      guaranteeCheckbox,
      contract,
      contractCheckbox,
      contragent,
      contragentCheckbox,
      newContragentName,
      newContragentINN,
      url
    }

    // Валидация формы, возвращает количество ошибок
    const validationForm = validationReceiptForm(tempValidation, values);

    if(validationForm == 0){
      return true;
    } else{
        dispatch(setValidation({ ...tempValidation }));
        dispatch(
          setMessageReceipt({
            errors: true,
            message: `Количество ошибок: ${validationForm}`,
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
        warehouse: warehouse,
        product: product,
        contract: contractCheckbox ? null : contract,
        contragent: contragentCheckbox ? null : contragent,
        newContragentName: contragentCheckbox ? newContragentName : null,
        newContragentINN: contragentCheckbox ? newContragentINN : null,
        url: url,
        guarantee: guaranteeCheckbox ? null : guarantee,
        count: count,
        min_count: min_count,
        sn: sn,
      });

      console.log(data);

      let requestOptions = {
        method: 'POST',
        body: data,
      };

      const result = await fetchNow(
      `${process.env.REACT_APP_API_SERVER}/receipt_product`,
      requestOptions
    );

    if (result.data) {
      dispatch(setMessageReceipt({ message: result.data }));
    } else {
      console.warn(result.error);
      dispatch(setMessageReceipt({ errors: true, message: result.error }));
    }

    setTimeout(() => {
      dispatch(setIsLoadingReceipt({ isLoading: false }));
    }, 200);


    } else {
      console.warn('Не пройдена валидация при оформлении прихода')
      return false;
    }

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
              validation={validation.count.status}
              value={count}
            />
            {!validation?.count?.status &&
              <div className={styles.error_message}>{validation.count.message}</div>
            }
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
              validation={validation.min_count.status}
              value={min_count}
            />
            {!validation?.min_count?.status &&
              <div className={styles.error_message}>{validation.min_count.message}</div>
            }
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

    if (!sn?.length) {
      dispatch(setSN({ sn: [...sn, inputSN] }));
      dispatch(setInputSN({ inputSN: '' }));
      return;
    }

    let index = sn.findIndex((item) => item === inputSN);

    if (index === -1) {
      dispatch(setSN({ sn: [...sn, inputSN] }));
      dispatch(setInputSN({ inputSN: '' }));
    } else {
      dispatch(
        setValidation({
            ...validation,
            sn: {
              status: false,
              message: 'Данный серийный номер уже введен',
            },
          },
        )
      );
    }
  };

  const deleteSerialNumber = (e) => {
    e.stopPropagation();
    e.preventDefault();

    let newState = sn.filter((item) => {
      return item !== e.target.dataset.value;
    });

    dispatch(setSN({ sn: newState }));
  };

  const resetForm = (e) => {
    e.preventDefault();
    dispatch(setDefaultReceipt());
    dispatch(setDefaultValue());
  };

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
              validation={validation.product.status}
              changeValue={(res) => {
                dispatch(setProduct(res));
              }}
              url={urlProduct}
            />
            {!validation?.product?.status &&
              <div className={styles.error_message}>{validation.product.message}</div>
            }
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
              validation={validation.warehouse.status}
              reset={reset}
              setReset={() => dispatch(setResetReceipt({ reset: false }))}
              url={'get_warehouse'}
            />
            {!validation?.warehouse?.status &&
              <div className={styles.error_message}>{validation.warehouse.message}</div>
             }
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
                  validation={validation.contract.status}
                  value={contract}
                  disabled={contractCheckbox}
                />

            {!validation?.contract?.status &&
              <div className={styles.error_message}>{validation.contract.message}</div>
            }

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
                  validation={validation.contragent.status}
                  reset={reset}
                  setReset={() => dispatch(setResetReceipt({ reset: false }))}
                  url={'get_contragents'}
                  disabled={contragentCheckbox}
                />

            {!validation?.contragent?.status &&
              <div className={styles.error_message}>{validation.contragent.message}</div>
            }

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
                        validation={validation.newContragentName.status}
                        value={newContragentName}
                      />

            {!validation?.newContragentName?.status &&
              <div className={styles.error_message}>{validation.newContragentName.message}</div>
            }

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
                        validation={validation.newContragentINN.status}
                        value={newContragentINN}
                      />

            {!validation?.newContragentINN?.status &&
              <div className={styles.error_message}>{validation.newContragentINN.message}</div>
            }
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
                  validation={validation.url.status}
                  value={url}
                />

            {!validation?.url?.status &&
              <div className={styles.error_message}>{validation.url.message}</div>
            }
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
                  validation={validation.guarantee.status}
                  value={guarantee}
                  disabled={guaranteeCheckbox}
                />

            {!validation?.guarantee?.status &&
              <div className={styles.error_message}>{validation.guarantee.message}</div>
            }

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
