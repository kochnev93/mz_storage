import React, {useState, useEffect, useMemo} from 'react';

import { MainWrapper } from '../../components/MainWrapper.jsx';
import { MyTable } from '../../components/elements/Table/MyTable.jsx';
import MyButton from '../../components/ui/Buttons/ButtonSend.jsx';
import styles from '../style.module.scss';

// redux
import { useDispatch } from 'react-redux';
import useFetch from '../../hooks/useFetch.js';
import { setActiveSomeTransfer } from '../../features/modal/transfer-someProductsSlice.js';


export const Transfers = () => {
  const dispatch = useDispatch();
  const { fetchNow } = useFetch();

  const [titleColumn] = useState([
    'id',
    'Наименование',
    'Откуда',
    'Куда',
    'SN',
    'Количество'
  ]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    
  }, []);


  const tableContent = useMemo(() => {
    if (warehouses.length) {
      return warehouses.map((item) => {
        return (
          <tr>
            <td>{item?.id}</td>
            <td>{item?.name}</td>
            <td>{item?.warehouse_title}</td>
            <td>{item?.adress}</td>
          </tr>
        );
      });
    }
  }, [warehouses]);


  return (
    <MainWrapper header_title="Перемещения" title='Перемещения'>
        <div className={styles.header}>
          <div className={styles.header_filter}>
            Фильтры
          </div>
          <MyButton type="send" title="Добавить" action={() => {dispatch(setActiveSomeTransfer({active: true}))}}/>
      </div>
      <MyTable titleColumn={titleColumn} content={tableContent} resultCount = {warehouses.length} />
    </MainWrapper>
  );
};
