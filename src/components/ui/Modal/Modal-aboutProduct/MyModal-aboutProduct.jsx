import React, { useState, useEffect } from 'react';
import cx from 'classnames';

// Hooks
import authHeader from '../../../../services/auth-header';
import { useAuth } from '../../../../hooks/use-auth';
import useFetch from '../../../../hooks/useFetch';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setActive,
  setErrors,
  setIsLoading,
  setMessage,
} from '../../../../features/modal/about-productSlice';

//Styles
import styles from './MyModal-aboutProduct.module.scss';

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import MyInput from '../../Input/MyInput.jsx';
import MyButton from '../../Buttons/ButtonSend.jsx';
import Modal from '../MyModal2.jsx';
import { Tabs } from '../../../Tabs/Tabs.jsx';
import { Tab } from '../../../Tabs/Tab.jsx';
import { Chat } from '../../../Chat/Chat.jsx';

function ModalAboutProduct() {
  const dispatch = useDispatch();
  const user = useAuth();
  const { fetchNow } = useFetch();

  // Local State
  const [data, setData] = useState(null);
  const [sn, setSn] = useState(null);
  const [history, setHistory] = useState(null);
  const [disabled, setDisabled] = useState(
    user.role === 'admin' ? false : true
  );

  // Redux
  const active = useSelector((state) => state.modal_about_product.active);
  const product_id = useSelector(
    (state) => state.modal_about_product.product_id
  );
  const warehouse_id = useSelector(
    (state) => state.modal_about_product.warehouse_id
  );
  const errors = useSelector((state) => state.modal_about_product.errors);
  const message = useSelector((state) => state.modal_about_product.message);
  const reset = useSelector((state) => state.modal_about_product.reset);
  const isLoading = useSelector((state) => state.modal_about_product.isLoading);

  useEffect(() => {
    if (product_id !== null) {
      fetchData(product_id, warehouse_id);
      fetchHistory(product_id);
    }
  }, [product_id, warehouse_id]);

  const fetchData = async (product, warehouse) => {
    dispatch(setIsLoading({ isLoading: true }));
    setData(null);

    let data = JSON.stringify({
      product_id: product,
      warehouse_id: warehouse,
    });

    let requestOptions = {
      method: 'POST',
      body: data,
    };

    const productInfo = await fetchNow(
      `http://localhost:3001/api/get_product/${product}`,
      requestOptions
    );

    if (productInfo.data) {
      setData(productInfo.data);
      dispatch(setIsLoading({ isLoading: false }));
    } else {
      dispatch(setMessage({ message: productInfo.errorMessage, errors: true }));
    }

    // const productSN = await fetchNow(
    //   `http://localhost:3001/api/get_sn_list`,
    //   requestOptions
    // );

    // if (productSN.data) {
    //   console.log(productSN.data);
    //   //dispatch(setIsLoading({ isLoading: false }));
    // } else {
    //   dispatch(setMessage({ message: productSN.errorMessage, errors: true }));
    // }
  };

  const fetchHistory = async (product_id) => {

    let requestOptions = {
      method: 'GET',
    };

    const history = await fetchNow(
      `http://localhost:3001/api/get_product_history/${product_id}`,
      requestOptions
    );

    if (history.data) {
      setHistory(history.data)
      dispatch(setIsLoading({ isLoading: false }));
    } else {
      dispatch(setMessage({ message: history.errorMessage, errors: true }));
    }

    console.log(history.data)

  };

  const getHistory = () => {
    if (history) {
      return history.map((item) => {
        return (
          <li>
            <h5 className={styles.history_title}>{item.title}</h5>
            <p className={styles.history_description}>{item.date_receipt} на склад {item.warehouse_receipt}</p>
            <details className={styles.history_details}>
              <summary>Подробнее</summary>
              <ul>
                <li>ID Receipt - {item.id_receipt}</li>
                <li>Номер договора - {item.contract}</li>
                <li>Ссылка на задачу - {item.url_receipt}</li>
                <li>Автор - {item.author}</li>
              </ul>
            </details>
            <p>{item.mz_user_login}</p>
          </li>
        );
      });
    } else {
      return <li>Ничего не найдено...</li>;
    }
  };

  return (
    <Modal
      active={active}
      setActive={() => {
        dispatch(setActive({ active: false }));
      }}
      title="Информация о товаре"
      message={message}
      errors={errors}
      isLoading={isLoading}
      footer={
        disabled
          ? 'Редактирование запрещено. Обратитесь к администратору'
          : 'Редактирование разрешено'
      }
    >
      <Tabs>
        <Tab label={'Общее'}>
          <div className={styles.modalAbout_form}>
            <div className={styles.modalAbout_formItem}>
              <MyInput
                title={'ID'}
                value={data?.id_product}
                disabled={true}
                validation={true}
              />
            </div>

            <div className={styles.modalAbout_formItem}>
              <MyInput
                title={'Наименование'}
                value={data?.name}
                disabled={true}
                validation={true}
              />
            </div>

            <div className={styles.modalAbout_formItem}>
              <MyInput
                title={'Категория'}
                value={data?.category_title}
                disabled={true}
                validation={true}
              />
            </div>

            <div className={styles.modalAbout_formItem}>
              <MyInput
                title={'Склад'}
                value={data?.warehouse_title}
                disabled={true}
                validation={true}
              />
            </div>

            <div className={styles.modalAbout_formItem}>
              <MyInput
                title={'Серийный номер'}
                value={data?.sn === null ? '-' : data?.sn}
                disabled={true}
                validation={true}
              />
            </div>

            <div className={styles.modalAbout_formItem}>
              <MyInput
                title={'Количество'}
                value={data?.sn === null ? data?.count : '1'}
                disabled={true}
                validation={true}
              />
            </div>

            <div className={styles.modalAbout_formItem}>
              <MyInput
                title={'Комментарий'}
                value={data?.comment}
                disabled={true}
                validation={true}
              />
            </div>

            <div className={styles.modalAbout_formItem}>
              {data?.accounting_sn ? 'Ведется серийный учет' : null}
            </div>

            <div className={styles.modalAbout_formItem}>
              <h4>Наличие на филиале {data?.warehouse_title}</h4>
              <ol>
                {sn?.map((el) => {
                  if (el.id_warehouse == warehouse_id) {
                    return <li>{el.sn}</li>;
                  }
                })}
              </ol>
            </div>

            {/* <div className={styles.modalAbout_formItem}>
            <h4>Наличие на других филиалах</h4>
              <ol>
                {sn?.map((el) => {
                  if (el.id_warehouse != warehouse_id) {
                    return <li>{el.sn} - {el.warehouse_title}</li>;
                  }
                })}
              </ol>
            </div> */}
          </div>
        </Tab>
        <Tab label={'История'}>
          <div>
            <ol className={styles.history_list}>{getHistory()}</ol>
          </div>
        </Tab>
        <Tab label={'Комментарии'}>
          {/* Скоро здесь будут комментарии.. */}
          <Chat />
        </Tab>
      </Tabs>
    </Modal>
  );
}

export default ModalAboutProduct;
