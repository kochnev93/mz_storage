import React, { useState, useEffect } from 'react';
import styles from './table.module.scss';
import { MyTable } from '../elements/Table/MyTable.jsx';
import { MyInputSearch } from '../elements/Form/InputSearch/MyInputSearch.jsx';
import { MyInputSubmit } from '../elements/Form/InputSubmit/MyInputSubmit.jsx';
import MyButton from '../ui/Buttons/ButtonSend.jsx';
import MyDropdown from '../ui/Dropdown/MyDropdown.jsx';
import cx from 'classnames';

// Hooks
import useFetch from '../../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { addProducts } from '../../features/dashboard/dashboardSlice';

export const Table = () => {
  const dispatch = useDispatch();

  // Dashboard
  const [warehouse, setWarehouse] = useState([]);
  const [validationWarehouse, setValidationWarehouse] = useState(true);
  const [category, setCategory] = useState([]);
  const [validationCategory, setValidationCategory] = useState(true);
  const [data, setData] = useState([]);
  const [titleColumn, setTitleColumn] = useState([
    'id',
    'Склад',
    'Категория',
    'Наименование',
    's/n',
    'Количество',
    'Действия',
  ]);

  const { fetchNow } = useFetch();

  // useEffect(() => {
  //   setWarehouse(JSON.parse(localStorage.getItem('mz_dashboard_warehouse')));
  //   setCategory(JSON.parse(localStorage.getItem('mz_dashboard_category')));
  //   setData(JSON.parse(localStorage.getItem('mz_dashboard_data')));
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('mz_dashboard_warehouse', JSON.stringify(warehouse));
  //   localStorage.setItem('mz_dashboard_category', JSON.stringify(category));
  // }, [warehouse, category]);

  const search = (e) => {
    e.preventDefault();
    let validation = validationForm();

    if (validation) {
      console.log('send');
      fetchData();
    } else {
      console.log('error');
    }
  };

  const validationForm = () => {
    let countError = 0;

    setValidationWarehouse(true);
    setValidationCategory(true);

    if (warehouse.length === 0) {
      setValidationWarehouse(false);
      countError++;
    }

    if (category.length === 0) {
      setValidationCategory(false);
      countError++;
    }

    return countError == 0 ? true : false;
  };

  const getProducts = async (e) => {
    e.preventDefault();

    const data = JSON.stringify({ warehouse: warehouse, category: category });

    let requestOptions = {
      method: 'POST',
      body: data,
    };

    const result = await fetchNow(
      'http://localhost:3001/api/get_products',
      requestOptions
    );

    dispatch(addProducts({ products: result.data }));

    if (result.data) {
      setData(result.data);
    } else {
      console.warn(result.error);
    }

    //localStorage.setItem('mz_dashboard_data', JSON.stringify(result));
  };

  return (
    <div className="dashboard">
      <form className={styles.form_dashboard_filter}>
        <div className={styles.MyDropdown}>
          <MyDropdown
            id="dashboard_warehouse"
            title="Склад"
            placeholder="Выберите склад"
            multiple={true}
            validation={validationWarehouse}
            changeValue={setWarehouse}
            url={'get_warehouse'}
          />
        </div>

        <div className={styles.MyDropdown}>
          <MyDropdown
            id="dashboard_category"
            title="Категория"
            placeholder="Выберите категорию"
            multiple={true}
            validation={validationCategory}
            changeValue={setCategory}
            url={'get_category'}
          />
        </div>

        <div className={styles.MyButton}>
          <MyButton
            type="send"
            action={getProducts}
            title="Найти"
            loadingTitle="Загрузка"
          />
        </div>
      </form>

      <MyTable titleColumn={titleColumn} content={data} />
    </div>
  );
};

export default Table;
