import React, { useState, useEffect } from 'react';

// Styles
import styles from './DashboardTable.module.scss';

// Components
import { MyTable } from '../elements/Table/MyTable.jsx';
import MyButton from '../ui/Buttons/ButtonSend.jsx';
import MyDropdown from '../ui/Dropdown/MyDropdown.jsx';
import { MyInputSearch } from '../elements/Form/InputSearch/MyInputSearch.jsx';
import Dropdown from '../ui/Dropdown/MyDropdown-function.jsx';

// Hooks
import useFetch from '../../hooks/useFetch';
import useFilterTable from '../../hooks/useFilterTable';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  addProducts,
  setWarehouseDashboard,
  setCategoryDashboard,
  setResetDashboard,
  setSearchDashboard,
  setIsLoadingDashboard,
  setErrorsDashboard,
} from '../../features/dashboard/dashboardSlice';

export const DashboardTable = () => {
  const dispatch = useDispatch();
  const { fetchNow } = useFetch();

  // Список филиалов и категорий
  const { warehouses, category } = useSelector((state) => state.app_state);

  const {
    products,
    warehouseFilter,
    categoryFilter,
    inputSearch,
    reset,
    errors,
    message,
    isLoading,
  } = useSelector((state) => state.dashboard);

  const [titleColumn, setTitleColumn] = useState([
    'id',
    'Склад',
    'Категория',
    'Наименование',
    's/n',
    'Количество',
    'Действия',
  ]);

  const validationForm = () => {
    let countError = 0;

    setValidationWarehouse(true);
    setValidationCategory(true);
    setValidationFilter(true);
    setErrorMessage('');

    if (search !== null && search !== '') {
      return true;
    } else if (warehouse.length === 0) {
      setValidationWarehouse(false);
      setValidationFilter(false);
      setErrorMessage('Выберите склад');
      countError++;
    } else if (category.length === 0) {
      setValidationCategory(false);
      setValidationFilter(false);
      setErrorMessage('Выберите категорию');
      countError++;
    }

    return countError == 0 ? true : false;
  };

  // Получение списка товаров
  const getProducts = async (e) => {
    e.preventDefault();

    dispatch(setIsLoadingDashboard(true));

    const data = JSON.stringify({
      warehouse: warehouseFilter,
      category: categoryFilter,
      search: inputSearch,
    });

    let requestOptions = {
      method: 'POST',
      body: data,
    };

    const result = await fetchNow(
      `${process.env.REACT_APP_API_SERVER}/get_products`,
      requestOptions
    );

    if (result.data) {
      dispatch(addProducts({ products: result.data }));
      dispatch(setErrorsDashboard({ errors: false, message: '' }));
    } else {
      dispatch(setErrorsDashboard({ errors: true, message: result.error }));
    }

    setTimeout(() => {
      dispatch(setIsLoadingDashboard(false));
    }, 300);
  };

  // Записываем список товаров в state
  //const data = useSelector((state) => state.dashboard.products);

  let data = [
    {
      id_product: 1,
      name: 'Монитор Asus P123DF',
      id_nomenclature: 1,
      id_warehouse: 12,
      warehouse_title: '10-я линия В.О., 17к2',
      id_category: 2,
      category_title: 'Монитор',
      sn: '123',
      accounting_sn: true
    },
    {
      id_product: 2,
      name: 'Монитор Asus P123DF',
      id_nomenclature: 1,
      id_warehouse: 12,
      warehouse_title: '10-я линия В.О., 17к2',
      id_category: 2,
      category_title: 'Монитор',
      sn: '123456',
      accounting_sn: true
    },
    {
      id_product: 3033,
      name: 'АДМ Ligat',
      id_nomenclature: 2,
      id_warehouse: 12,
      warehouse_title: '10-я линия В.О., 17к2',
      id_category: 2,
      category_title: 'Монитор',
      sn:[],
      count: 12,
      accounting_sn: false
    },
    {
      id_product: 3036,
      name: 'АДМ Ligat66',
      id_nomenclature: 3,
      id_warehouse: 12,
      warehouse_title: '10-я линия В.О., 17к2',
      id_category: 2,
      category_title: 'Монитор',
      sn: '123321123',
      accounting_sn: true
    },
  ];

  // Сортировка данных для отображения в таблице
  let bodyContent = useFilterTable(data);

  return (
    <div className="dashboard">
      <form className={styles.form_dashboard_filter}>
        <div className={styles.MyDropdown}>
          <Dropdown
            id="dashboard_warehouse"
            title="Склад"
            placeholder="Выберите склад"
            multiple={true}
            validation={true}
            options={warehouses}
            changeValue={(value) => {
              dispatch(setWarehouseDashboard(value));
            }}
            reset={reset}
            setReset={() => {
              dispatch(setResetDashboard({ reset: false }));
            }}
          />
        </div>

        <div className={styles.MyDropdown}>
          <Dropdown
            id="dashboard_category"
            title="Категория"
            placeholder="Выберите категорию"
            multiple={true}
            validation={true}
            options={category}
            changeValue={(value) => {
              dispatch(setCategoryDashboard(value));
            }}
            reset={reset}
            setReset={() => {
              dispatch(setResetDashboard({ reset: false }));
            }}
          />
        </div>

        <div className={styles.MyDropdown}>
          <MyInputSearch
            value={inputSearch}
            changeValue={(value) => {
              dispatch(setSearchDashboard(value));
            }}
          />
        </div>

        <div className={styles.MyButton}>
          <MyButton
            type="send"
            action={getProducts}
            title="Найти"
            loadingTitle="Загрузка"
            loading={isLoading}
          />
        </div>
      </form>

      <div className={styles.message_error}>{message}</div>

      <MyTable
        titleColumn={titleColumn}
        content={bodyContent}
        resultCount={products?.length}
      />
    </div>
  );
};

export default DashboardTable;
