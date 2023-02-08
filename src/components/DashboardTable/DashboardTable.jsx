import React, { useState, useEffect } from 'react';

// Styles
import styles from './DashboardTable.module.scss';

// Components
import { MyTable } from '../elements/Table/MyTable.jsx';
import MyButton from '../ui/Buttons/ButtonSend.jsx';
import MyDropdown from '../ui/Dropdown/MyDropdown.jsx';
import { MyInputSearch } from '../elements/Form/InputSearch/MyInputSearch.jsx';

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
  const [search, setSearch] = useState(null);
  const [validationFilter, setValidationFilter] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
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
    setValidationFilter(true);
    setErrorMessage('');

    if(search !== null && search !== ""){
      return true;
    } else if(warehouse.length === 0){
      setValidationWarehouse(false);
      setValidationFilter(false);
      setErrorMessage('Выберите склад');
      countError++;
    } else if(category.length === 0){
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

    if (!validationForm()) {
      return;
    }

    const data = JSON.stringify({ warehouse: warehouse, category: category, search: search });

    let requestOptions = {
      method: 'POST',
      body: data,
    };

    const result = await fetchNow(
      `${process.env.REACT_APP_API_SERVER}/get_products`,
      requestOptions
    );

    if(result.data){
      dispatch(addProducts({ products: result.data }));
    }

    
  };

  // Записываем список товаров в state
  const data = useSelector((state) => state.dashboard.products);

  // let data = [
  //   {
  //     id_product: 1,
  //     name: 'Монитор Asus P123DF',
  //     id_nomenclature: 1,
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: '123',
  //     accounting_sn: true
  //   },
  //   {
  //     id_product: 2,
  //     name: 'Монитор Asus P123DF',
  //     id_nomenclature: 1,
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: '123456',
  //     accounting_sn: true
  //   },
  //   {
  //     id_product: 3033,
  //     name: 'АДМ Ligat',
  //     id_nomenclature: 2,
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn:[],
  //     count: 12,
  //     accounting_sn: false
  //   },
  //   {
  //     id_product: 3036,
  //     name: 'АДМ Ligat66',
  //     id_nomenclature: 3,
  //     id_warehouse: 12,
  //     warehouse_title: '10-я линия В.О., 17к2',
  //     id_category: 2,
  //     category_title: 'Монитор',
  //     sn: '123321123',
  //     accounting_sn: true
  //   },
  // ];

  // Сортировка данных для отображения в таблице
  let bodyContent = useFilterTable(data);

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

        <div className={styles.MyDropdown}>
          <MyInputSearch value={search} changeValue={setSearch} />
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

      <div className={styles.message_error}>
        {validationFilter ? '' : errorMessage}
      </div>

      <MyTable
        titleColumn={titleColumn}
        content={bodyContent}
        resultCount={data.length}
      />
    </div>
  );
};

export default DashboardTable;
