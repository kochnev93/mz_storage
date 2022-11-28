import React, { useState, useEffect } from 'react';

// Styles
import styles from './DashboardTable.module.scss';

// Components
import { MyTable } from '../elements/Table/MyTable.jsx';
import MyButton from '../ui/Buttons/ButtonSend.jsx';
import MyDropdown from '../ui/Dropdown/MyDropdown.jsx';


// Hooks
import useFetch from '../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '../../features/dashboard/dashboardSlice';
import useFilterTable from '../../hooks/useFilterTable';


export const DashboardTable = () => {
  const dispatch = useDispatch();

  // Dashboard
  const [warehouse, setWarehouse] = useState([]);
  const [validationWarehouse, setValidationWarehouse] = useState(true);
  const [category, setCategory] = useState([]);
  const [validationCategory, setValidationCategory] = useState(true);
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

  // Получение списка товаров
  const getProducts = async (e) => {
    e.preventDefault();

    const data = JSON.stringify({ warehouse: warehouse, category: category });

    let requestOptions = {
      method: 'POST',
      body: data,
    };

    const result = await fetchNow(
      `http://localhost:3001/api/get_products`,
      requestOptions
    );

    dispatch(addProducts({ products: result.data }));
  };

  const data = useSelector((state) => state.dashboard.products);
  let bodyContent = useFilterTable(data);  // Сортировка данных для отображения в таблице

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

      <MyTable titleColumn={titleColumn} content={bodyContent} />
    </div>
  );
};

export default DashboardTable;
