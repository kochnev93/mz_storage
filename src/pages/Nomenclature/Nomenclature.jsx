import React, { useState, useEffect, useMemo } from 'react';

// Components
import { MainWrapper } from '../../components/MainWrapper.jsx';
import { MyTable } from '../../components/elements/Table/MyTable.jsx';

// Hooks
import useFetch from '../../hooks/useFetch.js';

export const Nomenclature = () => {
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
  const [xxx, setxxx] = useState([]);

  const { fetchNow } = useFetch();

  useEffect(() => {
    getNomenclature();
  }, []);

  // useEffect(() => {
  //   setxxx(getStr());
  // }, [nomenclature]);

  const getStr = () => {
    return nomenclature.map((item) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.category_title}</td>
          <td>{item.accounting_sn ? 'Да' : 'Нет'}</td>
          <td>{item.unit}</td>
          <td>{item.date_create}</td>
          <td>{item.mz_user_login}</td>
          <td>{item.comment}</td>
        </tr>
      );
    });
  };

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

  //const temp = getNomenclature();
  console.log('nomenclature', nomenclature);
  console.log('xxx', xxx);

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
            <td>{item?.date_create}</td>
            <td>{item?.mz_user_login}</td>
            <td>{item?.comment}</td>
          </tr>
        );
      });
    }
  }, [nomenclature]);

  return (
    <MainWrapper header_title="Номенклатура" title="Номенклатура">
      <MyTable titleColumn={titleColumn} content={tableContent} />
    </MainWrapper>
  );
};