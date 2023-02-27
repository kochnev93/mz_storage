import React, {useState, useEffect, useMemo} from 'react';

import { MainWrapper } from '../../components/MainWrapper.jsx';
import { MyTable } from '../../components/elements/Table/MyTable.jsx';
import MyButton from '../../components/ui/Buttons/ButtonSend.jsx';
import styles from '../style.module.scss';

// redux
import { useDispatch } from 'react-redux';
import useFetch from '../../hooks/useFetch.js';
import { setActiveWarehouse } from '../../features/modal/add-warehouseSlice.js';


export const Warehouses = () => {
  const dispatch = useDispatch();
  const { fetchNow } = useFetch();

  const [titleColumn] = useState([
    'id',
    'Наименование',
    'Адрес',
    'Код'
  ]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    getWarehouses();
  }, []);

  // Получение списка скалдов
  const getWarehouses = async () => {
    let requestOptions = {
      method: 'GET',
    };

    const result = await fetchNow(
      `${process.env.REACT_APP_API_SERVER}/get_warehouse/all`,
      requestOptions
    );

    setWarehouses(result.data);

    return result.data;
  };


  const tableContent = useMemo(() => {
    if (warehouses.length) {
      return warehouses.map((item) => {
        return (
          <tr>
            <td>{item?.id}</td>
            <td>{item?.warehouse_title}</td>
            <td>{item?.warehouse_adress}</td>
            <td>{item?.warehouse_number}</td>
          </tr>
        );
      });
    }
  }, [warehouses]);


  return (
    <MainWrapper header_title="Склады" title='Склады'>
        <div className={styles.header}>
          <div className={styles.header_filter}>
            Фильтры
          </div>
          <MyButton type="send" title="Добавить" action={() => {dispatch(setActiveWarehouse({ active: true }))}}/>
      </div>
      <MyTable titleColumn={titleColumn} content={tableContent} resultCount = {warehouses.length} />
    </MainWrapper>
  );
};
