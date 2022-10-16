import React, { useState, useEffect } from 'react';
import styles from './table.module.scss';
import { MyTable } from '../elements/Table/MyTable.jsx';
import { MyInputSearch } from '../elements/Form/InputSearch/MyInputSearch.jsx';
import { MyInputSubmit } from '../elements/Form/InputSubmit/MyInputSubmit.jsx';
import MyButton from '../ui/Buttons/ButtonSend.jsx';
import MyDropdown from '../ui/Dropdown/MyDropdown.jsx';
import cx from 'classnames';
import authHeader from '../../services/auth-header';


export const Table = () => {

  // Dashboard
  const [warehouse, setWarehouse] = useState([]);
  const [validationWarehouse, setValidationWarehouse] = useState(true);
  const [category, setCategory] = useState([]);
  const [validationCategory, setValidationCategory] = useState(true);
  const [data, setData] = useState(null);
  const [titleColumn, setTitleColumn] = useState([
    '№ п/п',
    'Склад',
    'Категория',
    'Наименование',
    's/n',
    'Количество',
    'Действия',
  ]);

  useEffect(() => {
    setWarehouse(JSON.parse(localStorage.getItem('mz_dashboard_warehouse')));
    setCategory(JSON.parse(localStorage.getItem('mz_dashboard_category')));
    setData(JSON.parse(localStorage.getItem('mz_dashboard_data')));
  }, []);

  useEffect(() => {
    localStorage.setItem('mz_dashboard_warehouse', JSON.stringify(warehouse));
    localStorage.setItem('mz_dashboard_category', JSON.stringify(category));
  }, [warehouse, category]);

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

  const fetchData = async () => {
    let myHeaders = new Headers();
    myHeaders.append('content-type', 'application/json');
    myHeaders.append('Authorization', `${authHeader()}`);

    const data = JSON.stringify({ warehouse: warehouse, category: category });

    let requestOptions = {
      //mode: 'no-cors',
      method: 'POST',
      headers: myHeaders,
      body: data,
    };

    fetch('http://localhost:3001/api/get_products', requestOptions)
      .then((res) => {
        console.log(res);

        if (!res.ok) {
          throw new Error(`${res.status}. ${res.statusText}`);
        } else {
          return res.json();
        }
      })
      .then((result) => {
        console.log(result);
        setData(result);
        localStorage.setItem('mz_dashboard_data', JSON.stringify(result));
      })
      .catch((err) => {
        console.log(err);
      });
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
            action={search}
            title="Найти"
            loadingTitle="Загрузка"
          />
        </div>
      </form>

      <MyTable
        titleColumn={titleColumn}
        content={data}
      />
    </div>
  );
};

export default Table;
