import React, { useState, useEffect } from 'react';
import cx from 'classnames';

// Hooks
import authHeader from '../../../../services/auth-header';
import { useAuth } from '../../../../hooks/use-auth';

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
  console.log(user);

  // Local State
  const [data, setData] = useState(null);
  const [history, setHistory] = useState(null);
  const [disabled, setDisabled] = useState(
    user.role === 'admin' ? false : true
  );

  // Redux
  const active = useSelector((state) => state.modal_about_product.active);
  const product = useSelector((state) => state.modal_about_product.product_id);
  const errors = useSelector((state) => state.modal_about_product.errors);
  const message = useSelector((state) => state.modal_about_product.message);
  const reset = useSelector((state) => state.modal_about_product.reset);
  const isLoading = useSelector((state) => state.modal_about_product.isLoading);

  useEffect(() => {
    if (product !== null) {
      fetchData(product);
      fetchHistory(product);
    }
  }, [product]);

  const fetchData = (product) => {
    let myHeaders = new Headers();
    myHeaders.append('content-type', 'application/json');
    myHeaders.append('Authorization', `${authHeader()}`);

    let requestOptions = {
      //mode: 'no-cors',
      method: 'GET',
      headers: myHeaders,
    };

    fetch(`http://localhost:3001/api/get_product/${product}`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);

        if (result.errorMessage) {
          dispatch(setMessage({ message: result.errorMessage, errors: true }));
          throw Error(result.errorMessage);
        }

        setData(result.data);
        dispatch(setIsLoading({ isLoading: false }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchHistory = (product) => {
    let myHeaders = new Headers();
    myHeaders.append('content-type', 'application/json');
    myHeaders.append('Authorization', `${authHeader()}`);

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(
      `http://localhost:3001/api/get_product_history/${product}`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);

        if (result.errorMessage) {
          dispatch(setMessage({ message: result.errorMessage, errors: true }));
          throw Error(result.errorMessage);
        }

        setHistory(result.data);
        dispatch(setIsLoading({ isLoading: false }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getHistory = () => {
    if (history) {
      return history.map((item) => {
        return (
          <li>
            <div>{item.date}</div>
            <p>{item.text}</p>
            <details>
              <summary>Изменения</summary>
              <ul>
                <li>Наименование: {item.change.product_name}</li>
                <li>Категория: {item.change.category_title}</li>
                <li>Склад: {item.change.warehouse_title}</li>
                <li>s/n: {item.change.product_sn}</li>
              </ul>
            </details>
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
                value={data?.id}
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
                value={data?.category_id}
                disabled={true}
                validation={true}
              />
            </div>

            <div className={styles.modalAbout_formItem}>
              <MyInput
                title={'Склад'}
                value={data?.warehouse_id}
                disabled={true}
                validation={true}
              />
            </div>

            <div className={styles.modalAbout_formItem}>
              <MyInput
                title={'SN'}
                value={data?.sn}
                disabled={true}
                validation={true}
              />
            </div>
          </div>
        </Tab>
        <Tab label={'История'}>
          <div>
            <ul className={styles.history_list}>{getHistory()}</ul>
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
