import React, { useState, useMemo } from 'react';

// Hooks
import useFetch from '../../../../hooks/useFetch';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveSomeTransfer,
  setProductSomeTransfer,
  setMessagesomeTransfer,
  setResetSomeTransfer,
  setDefaultSomeTransfer,
  setIsLoadingsomeTransfer,
  setErrorsSomeTransfer,
  setWarehouseFromSomeTransfer,
  setWarehouseToSomeTransfer,
  setCountSomeTransfer,
  setValidationSomeTransfer,
  setDefaultValidationSomeTransfer,
} from '../../../../features/modal/transfer-someProductsSlice';

//Styles
import styles from './Modal-transfersSomeProducts.module.scss';
import stylesModal from '../MyModal.module.scss';
import { ImArrowRight } from 'react-icons/Im';

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import Modal from '../MyModal2.jsx';
import MyInput from '../../Input/MyInput.jsx';
import { MyTable } from '../../../elements/Table/MyTable.jsx';
import Dropdown from '../../Dropdown/MyDropdown-function.jsx';
import { FormModal } from '../FormModal/FormModal.jsx';
import { FormItemModal } from '../FormItemModal/FormItemModal.jsx';
import { FormItemError } from '../FormItemModal/FormItemError.jsx';
import ModalDialog from '../MyModalDialog.jsx';

function ModalTransfersSomeProducts() {
  const dispatch = useDispatch();

  // Redux State
  const {
    active,
    errors,
    message,
    reset,
    isLoading,
    isEdit,
    products,
    urlProducts,
    warehouseFrom,
    warehouseTo,
    validation,
    validationWarehouseTo,
    validationWarehouseFrom,
    validationProducts,
  } = useSelector((state) => state.modal_transfer_someProducts);

  // Список филиалов
  const { warehouses } = useSelector((state) => state.app_state);

  const [titleColumns] = useState([
    '№',
    'id',
    'Наименование',
    'sn',
    'Остаток',
    'Количество (перемещение)',
    'Статус',
    'Описание',
  ]);

  const [activeCloseDialog, setActiveCloseDialog] = useState(false);
  const [activeTransferDialog, setActiveTransferDialog] = useState(false);

  const { fetchNow } = useFetch();

  const closeDialog = (answer) => {
    setActiveCloseDialog(false);
    if (answer) closeModal();
  };

  const transferDialog = (answer) => {
    setActiveTransferDialog(false);
    if (answer) addTransfer();
  };

  const closeModal = () => {
    dispatch(setActiveSomeTransfer({ active: false }));
    dispatch(setDefaultSomeTransfer());
  };

  const resetForm = () => {
    dispatch(setDefaultSomeTransfer());
  };

  const validateForm = () => {
    let errorCounter = 0;

    dispatch(setDefaultValidationSomeTransfer());

    if (warehouseFrom.length == 0) {
      dispatch(
        setErrorsSomeTransfer({
          errors: true,
          message: 'Выберите склад (откуда)',
          validationWarehouseFrom: false,
          validationWarehouseTo: true,
          validationProducts: true,
        })
      );

      return false;
    }

    if (warehouseTo.length == 0) {
      dispatch(
        setErrorsSomeTransfer({
          errors: true,
          message: 'Выберите склад (куда)',
          validationWarehouseTo: false,
          validationProducts: true,
          validationWarehouseFrom: true,
        })
      );

      return false;
    }

    if (products.length == 0) {
      dispatch(
        setErrorsSomeTransfer({
          errors: true,
          message: 'Выберите товар / товары',
          validationProducts: false,
          validationWarehouseFrom: true,
          validationWarehouseTo: true,
        })
      );

      return false;
    }

    if (warehouseFrom[0].title === warehouseTo[0].title) {
      dispatch(
        setErrorsSomeTransfer({
          errors: true,
          message: 'Нельзя перемещать на этот же склад',
          validationWarehouseTo: false,
          validationProducts: true,
          validationWarehouseFrom: true,
        })
      );

      return false;
    }

    products.forEach((product, index) => {
      if (!product.accounting_sn) {
        if (product.countTransfer < 1) {
          errorCounter++;
          dispatch(
            setValidationSomeTransfer({
              id_product: product.id,
              validationCountTransfer: false,
              validationMessage: 'Количество должно быть >0',
            })
          );
        }

        if (product.countTransfer > product.count) {
          errorCounter++;
          dispatch(
            setValidationSomeTransfer({
              id_product: product.id,
              validationCountTransfer: false,
              validationMessage: 'Количество превышает остаток',
            })
          );
        }
      }
    });

    return errorCounter == 0 ? true : false;
  };

  const getTransferStatus = (item) => {
    if (!item.hasOwnProperty('status_transfer'))
      return <span title="Ожидает перемещения">&#128260;</span>;

    return (
      <>
        {item.status_transfer ? (
          <span title="Успешно" style={{ color: 'green' }}>
            &#9989;
          </span>
        ) : (
          <span title="Ошибка" style={{ color: 'red' }}>
            &#10060;
          </span>
        )}
      </>
    );
  };

  const addTransfer = async () => {
    if (validateForm()) {
      dispatch(setIsLoadingsomeTransfer({ isLoading: true }));

      let data = JSON.stringify({
        warehouseFrom,
        warehouseTo,
        products,
      });

      let requestOptions = {
        method: 'POST',
        body: data,
      };

      const result = await fetchNow(
        `${process.env.REACT_APP_API_SERVER}/transfer_products`,
        requestOptions
      );

      console.log('transfer-modal', result);

      if (result.data) {
        dispatch(setMessagesomeTransfer({ message: result.data }));
        dispatch(setProductSomeTransfer(result.transfers));

        setTimeout(() => {
          dispatch(setIsLoadingsomeTransfer({ isLoading: false }));
        }, 100);
      } else {
        dispatch(setIsLoadingsomeTransfer({ isLoading: false }));
        dispatch(
          setErrorsSomeTransfer({
            errors: true,
            message: result.error,
            validationWarehouseTo: true,
            validationProducts: true,
            validationWarehouseFrom: true,
          })
        );
      }
    } else {
      console.warn('Не пройдена валидация формы');
    }
  };

  const tableContent = products?.map((item, index) => {
    return (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.sn}</td>
        <td>{item.accounting_sn ? '1' : item.count}</td>
        <td>
          {!item.accounting_sn ? (
            <input
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                color: 'var(--text-color)',
                border: '1px solid var(--colorMenuIcon)',
                padding: '5px',
              }}
              type="number"
              onChange={(e) => {
                dispatch(
                  setCountSomeTransfer({
                    countTransfer: e.target.value,
                    id_product: item.id,
                  })
                );
              }}
              value={item?.countTransfer}
            />
          ) : (
            '1'
          )}
        </td>
        <td style={{ textAlign: 'center' }}>{getTransferStatus(item)}</td>
        <td style={{ color: 'red' }}>{item?.error ? item.error : ''}</td>
      </tr>
    );
  });

  return (
    <>
      <ModalDialog
        active={activeCloseDialog}
        action={closeDialog}
        title="Закрыть без сохранения?"
        subtitle="Все не сохраненные изменения будут сброшены"
        succsesTitle="Да"
        cancelTitle="Отмена"
      />

      <ModalDialog
        active={activeTransferDialog}
        action={transferDialog}
        title="Перемещение товаров"
        subtitle={`Переместить товары со склада ${warehouseFrom[0]?.title} на склад ${warehouseTo[0]?.title}?`}
        succsesTitle="Да"
        cancelTitle="Отмена"
      >
        <ul
          style={{
            marginTop: '10px',
            listStyle: 'none',
            color: 'var(--text-color)',
            fontSize: '14px'
          }}
        >
          {products?.map((item) => {
            let str;
            if (item.accounting_sn) str = `${item.name}, sn: ${item.sn}`;
            if (!item.accounting_sn)
              str = `${item.name}, количество: ${item.countTransfer}`;
            return <li style={{ marginBottom: '5px' }} key={item.id}>{str}</li>;
          })}
        </ul>
      </ModalDialog>

      <Modal
        active={active}
        size={'big'}
        setActive={
          isEdit
            ? () => {
                setActiveCloseDialog(true);
              }
            : () => {
                closeModal();
              }
        }
        title={`Перемещение товара(ов)`}
        message={message}
        errors={errors}
        isLoading={isLoading}
        actions={{
          visible: true,
          buttonSend: {
            action: () => {
              setActiveTransferDialog(true);
            },
            title: 'Переместить',
            loadingTitle: 'Перемещаю',
            loading: isLoading,
            disabled: !isEdit,
          },
          buttonClear: {
            action: resetForm,
            title: 'Сбросить',
            loadingTitle: 'Сбросить',
            loading: isLoading,
          },
        }}
      >
        <FormModal
          columns={3}
          styles={{ gridAutoRows: '100px', gridTemplateColumns: '2fr 1fr 2fr' }}
        >
          <FormItemModal>
            <h4>1. Выберите склад (откуда)</h4>

            <Dropdown
              id="receiptProductModal_warehouseFrom"
              title="Склад (откуда)"
              placeholder="Откуда"
              multiple={false}
              changeValue={(value) => {
                dispatch(setWarehouseFromSomeTransfer(value));
              }}
              reset={reset}
              setReset={() => {
                dispatch(setResetSomeTransfer({ reset: false }));
              }}
              options={warehouses}
              validation={validationWarehouseFrom}
            />

            <FormItemError status={true} message={'validation?.name.message'} />
          </FormItemModal>

          <FormItemModal
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '30px',
            }}
            visible={!warehouseFrom?.length}
          >
            <ImArrowRight style={{ fill: 'var(--main-color)' }} />
          </FormItemModal>

          <FormItemModal visible={!warehouseFrom?.length}>
            <h4>2. Выберите склад (куда)</h4>

            <Dropdown
              id="receiptProductModal_warehouseTo"
              title="Склад (куда)"
              placeholder="Куда"
              multiple={false}
              changeValue={(value) => {
                dispatch(setWarehouseToSomeTransfer(value));
              }}
              reset={reset}
              setReset={() => {
                dispatch(setResetSomeTransfer({ reset: false }));
              }}
              options={warehouses}
              validation={validationWarehouseTo}
            />

            <FormItemError status={true} message={'validation?.name.message'} />
          </FormItemModal>

          <FormItemModal visible={!warehouseFrom?.length}>
            <h4>3. Выберите товар / товары</h4>

            <Dropdown
              id="receiptProductModal_products"
              title="Товары"
              placeholder="Товары"
              multiple={true}
              changeValue={(value) => {
                dispatch(setProductSomeTransfer(value));
              }}
              reset={reset}
              setReset={() => {
                dispatch(setResetSomeTransfer({ reset: false }));
              }}
              //options={warehouses}
              url={urlProducts}
              validation={validationWarehouseFrom}
            />

            <FormItemError status={true} message={'validation?.name.message'} />
          </FormItemModal>

          <FormItemModal
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '30px',
            }}
            visible={!warehouseFrom?.length}
          >
            <ImArrowRight style={{ fill: 'var(--main-color)' }} />
          </FormItemModal>

          <FormItemModal
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}
            visible={!warehouseFrom?.length}
          >
            <h4>4. Укажите количество</h4>
            <p className={stylesModal.description}>
              Проверьте таблицу ниже. Укажите количество для товаров без
              серийного номера и нажмите "Переместить"
            </p>
          </FormItemModal>
        </FormModal>

        {products.length != 0 && (
          <MyTable
            titleColumn={titleColumns}
            content={tableContent}
            resultCount={tableContent?.length}
          />
        )}
      </Modal>
    </>
  );
}

export default ModalTransfersSomeProducts;
