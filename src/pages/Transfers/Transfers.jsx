import React, { useState, useEffect, useMemo } from 'react';
import cx from 'classnames';

import { MainWrapper } from '../../components/MainWrapper.jsx';
import { MyTable } from '../../components/elements/Table/MyTable.jsx';
import MyButton from '../../components/ui/Buttons/ButtonSend.jsx';
import styles from '../style.module.scss';
import ModalTransfersSomeProducts from '../../components/ui/Modal/Modal-transfersSomeProducts/Modal-transfersSomeProducts.jsx';
import MyInput from '../../components/ui/Input/MyInput.jsx';
import Dropdown from '../../components/ui/Dropdown/MyDropdown-function.jsx';

// redux
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch.js';
import { setActiveSomeTransfer } from '../../features/modal/transfer-someProductsSlice.js';
import {
  fetchTransfers,
  setDefaultPageTransfer,
  setResetPageTransfer,
  setWarehouseFrom,
  setWarehouseTo,
  setSearch,
  setDateBegin,
  setDateEnd,
} from '../../features/transfers/transfers-pageSlice.js';

export const Transfers = () => {
  const dispatch = useDispatch();
  const { fetchNow } = useFetch();

  // Список филиалов
  const { warehouses } = useSelector((state) => state.app_state);

  const {
    transfers,
    errors,
    message,
    reset,
    isLoading,
    warehouseTo,
    warehouseFrom,
    dateBegin,
    dateEnd,
    search,
  } = useSelector((state) => state.transferPage);

  const [titleColumn] = useState([
    'id',
    'Наименование',
    'Откуда',
    'Куда',
    'SN',
    'Количество',
    'Автор',
    'Дата',
  ]);

  const [visibleFilter, setVisibleFilter] = useState(false);

  useEffect(() => {
    //dispatch(fetchTransfers());
  }, []);

  const getTransfer = () => {
    const data = JSON.stringify({
      warehouseTo,
      warehouseFrom,
      dateBegin,
      dateEnd,
      search,
    });

    dispatch(fetchTransfers(data));
  };

  const tableContent = useMemo(() => {
    if (transfers?.length) {
      return transfers.map((item) => {
        return (
          <tr key={item.id_transfer}>
            <td>{item?.id_transfer}</td>
            <td>{item?.name}</td>
            <td>{item?.old_warehouse}</td>
            <td>{item?.new_warehouse}</td>
            <td>{item?.sn}</td>
            <td>{item?.count}</td>
            <td>{item?.mz_user_login}</td>
            <td>{new Date(item?.date).toLocaleString()}</td>
          </tr>
        );
      });
    }
  }, [transfers]);

  return (
    <>
      <ModalTransfersSomeProducts />
      <MainWrapper header_title="Перемещения" title="Перемещения">
        <MyButton
          type="send"
          title="+ Добавить"
          action={() => {
            dispatch(setActiveSomeTransfer({ active: true }));
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h4>Фильтры: </h4>
          <a
            onClick={() => {
              visibleFilter ? setVisibleFilter(false) : setVisibleFilter(true);
            }}
            style={{
              color: 'var(--main-color)',
              paddingLeft: '10px',
              cursor: 'pointer',
            }}
          >
            {visibleFilter ? 'Скрыть' : 'Показать'}
          </a>
        </div>

          <div className={styles.header_filter} style={{display: `${visibleFilter ? 'flex' : 'none'}`}}>
            <div className={styles.filter_items}>
              <MyInput
                type="date"
                title="От"
                changeValue={(value) => {
                  dispatch(setDateBegin({ dateBegin: value }));
                }}
                validation={true}
                value={dateBegin}
              />

              <MyInput
                type="date"
                title="До"
                changeValue={(value) => {
                  dispatch(setDateEnd({ dateEnd: value }));
                }}
                validation={true}
                value={dateEnd}
              />

              <Dropdown
                id="transfer_warehouseFrom"
                title="Склад (откуда)"
                placeholder="Откуда"
                multiple={true}
                validation={true}
                options={warehouses}
                changeValue={(value) => {
                  dispatch(setWarehouseFrom(value));
                }}
                reset={reset}
                setReset={() => {
                  dispatch(setResetPageTransfer({ reset: false }));
                }}
              />
              <Dropdown
                id="transfer_warehouseTo"
                title="Склад (куда)"
                placeholder="Куда"
                multiple={true}
                validation={true}
                options={warehouses}
                changeValue={(value) => {
                  dispatch(setWarehouseTo(value));
                }}
                reset={reset}
                setReset={() => {
                  dispatch(setResetPageTransfer({ reset: false }));
                }}
              />
            </div>

            <div className={styles.filter_btn}>
              <MyButton
                type="clear"
                title="Сбросить"
                action={() => {
                  dispatch(setDefaultPageTransfer());
                }}
              />

              <MyButton
                type="send"
                title="Найти"
                loadingTitle="Ищу..."
                loading={isLoading}
                action={() => {
                  getTransfer();
                }}
              />
            </div>
          </div>
        

        <div className={cx(styles.header_status, { [styles.error]: errors })}>
          {message}
        </div>
        <MyTable
          titleColumn={titleColumn}
          content={tableContent}
          resultCount={transfers?.length}
        />
      </MainWrapper>
    </>
  );
};
