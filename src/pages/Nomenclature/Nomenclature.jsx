import React, { useState, useEffect, useMemo } from "react";
import cx from "classnames";

// Styles
import styles from "../style.module.scss";

// Components
import { MainWrapper } from "../../components/MainWrapper.jsx";
import { MyTable } from "../../components/elements/Table/MyTable.jsx";
import MyButton from "../../components/ui/Buttons/ButtonSend.jsx";
import ModalAddProduct from "../../components/ui/Modal/Modal-addproduct/Modal-addProduct.jsx";
import Dropdown from "../../components/ui/Dropdown/MyDropdown-function.jsx";
import MyInput from "../../components/ui/Input/MyInput.jsx";

// Hooks
import useFetch from "../../hooks/useFetch.js";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../features/modal/add-productSlice.js";
import {
  setDefaultPageNomenclature,
  setResetPageNomenclature,
  setCategory,
  setSearch,
} from "../../features/nomenclature/nomenclature-pageSlice";

export const Nomenclature = () => {
  const dispatch = useDispatch();
  const { fetchNow } = useFetch();

  // Список категорий
  const { category } = useSelector((state) => state.app_state);

  const { errors, message, reset, isLoading, category_filter, search } =
    useSelector((state) => state.nomenclaturePage);

  const [titleColumn] = useState([
    "id",
    "Наименование",
    "Категория",
    "Серийный учет",
    "Единица измерения",
    "Дата создания",
    "Автор",
    "Комментарий",
  ]);
  const [nomenclature, setNomenclature] = useState([]);
  const [visibleFilter, setVisibleFilter] = useState(true);

  useEffect(() => {
    getNomenclature();
  }, []);

  // Получение списка номенклатуры
  const getNomenclature = async () => {
    let requestOptions = {
      method: "GET",
    };

    const result = await fetchNow(
      `${process.env.REACT_APP_API_SERVER}/get_nomenclature`,
      requestOptions
    );

    setNomenclature(result.data);

    return result.data;
  };

  const tableContent = useMemo(() => {
    if (!nomenclature?.length) return [];

    return nomenclature.map((item) => {
      <tr>
        <td>{item?.id}</td>
        <td>{item?.name}</td>
        <td>{item?.category_title}</td>
        <td>{item?.accounting_sn ? "Да" : "Нет"}</td>
        <td>{item?.unit}</td>
        <td>{new Date(item?.date_create).toLocaleString()}</td>
        <td>{item?.mz_user_login}</td>
        <td>{item?.comment}</td>
      </tr>;
    });
  }, [nomenclature]);

  return (
    <>
      <ModalAddProduct />
      <MainWrapper header_title="Номенклатура" title="Номенклатура">
        <MyButton
          type="send"
          title="+ Добавить"
          action={() => {
            dispatch(setActive({ active: true }));
          }}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <h4>Фильтры: </h4>
          <a
            onClick={() => {
              visibleFilter ? setVisibleFilter(false) : setVisibleFilter(true);
            }}
            style={{
              color: "var(--main-color)",
              paddingLeft: "10px",
              cursor: "pointer",
            }}
          >
            {visibleFilter ? "Скрыть" : "Показать"}
          </a>
        </div>

        <div
          className={styles.header_filter}
          style={{ display: `${visibleFilter ? "flex" : "none"}` }}
        >
          <div className={styles.filter_items}>
            <Dropdown
              id="nomenclature_category"
              title="Категория"
              placeholder="Категория"
              multiple={true}
              validation={true}
              options={category}
              changeValue={(value) => {
                dispatch(setCategory(value));
              }}
              reset={reset}
              setReset={() => {
                dispatch(setResetPageNomenclature({ reset: false }));
              }}
            />

            <MyInput
              type="search"
              title="Поиск"
              changeValue={(value) => {
                dispatch(setSearch({ search: value }));
              }}
              validation={true}
              value={search}
            />
          </div>

          <div className={styles.filter_btn}>
            <MyButton
              type="clear"
              title="Сбросить"
              action={() => {
                dispatch(setDefaultPageNomenclature());
              }}
            />

            <MyButton
              type="send"
              title="Найти"
              loadingTitle="Загрузка"
              loading={isLoading}
              action={() => {
                getNomenclature();
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
          resultCount={nomenclature?.length}
        />
      </MainWrapper>
    </>
  );
};
