import React, { useState, useEffect, useMemo } from 'react';

// Styles
import styles from "./Nomenclature.module.scss";

// Components
import { MainWrapper } from '../../components/MainWrapper.jsx';
import { MyTable } from '../../components/elements/Table/MyTable.jsx';
import MyButton from '../../components/ui/Buttons/ButtonSend.jsx';

// Hooks
import useFetch from '../../hooks/useFetch.js';

// redux
import { useDispatch } from 'react-redux';
import { setActive } from '../../features/modal/add-productSlice.js';


export const Nomenclature = () => {
  const dispatch = useDispatch();

  const [titleColumn, setTitleColumn] = useState([
    'id',
    'Наименование',
    'Категория',
    'Серийный учет',
    'Единица измерения',
    'Дата создания',
    'Автор',
    'Комментарий',
  ]);
  const [nomenclature, setNomenclature] = useState([]);
  const { fetchNow } = useFetch();

  useEffect(() => {
    getNomenclature();
  }, []);

  // Получение списка номенклатуры
  const getNomenclature = async () => {
    let requestOptions = {
      method: 'GET',
    };

    const result = await fetchNow(
      `http://localhost:3001/api/get_nomenclature`,
      requestOptions
    );

    setNomenclature(result.data);

    return result.data;
  };

  const tableContent = useMemo(() => {
    if (nomenclature.length) {
      return nomenclature.map((item) => {
        return (
          <tr>
            <td>{item?.id}</td>
            <td>{item?.name}</td>
            <td>{item?.category_title}</td>
            <td>{item?.accounting_sn ? 'Да' : 'Нет'}</td>
            <td>{item?.unit}</td>
            <td>{new Date(item?.date_create).toLocaleString()}</td>
            <td>{item?.mz_user_login}</td>
            <td>{item?.comment}</td>
          </tr>
        );
      });
    }
  }, [nomenclature]);


  return (
    <MainWrapper header_title="Номенклатура" title="Номенклатура">
      <div className={styles.header}>
        <div className={styles.header_filter}>
          Фильтры
        </div>
        <MyButton type="send" title="Добавить" action={() => {dispatch( setActive({active: true}) )}}/>
      </div>
      
      <MyTable titleColumn={titleColumn} content={tableContent} resultCount = {nomenclature.length} />
    </MainWrapper>
  );
};
