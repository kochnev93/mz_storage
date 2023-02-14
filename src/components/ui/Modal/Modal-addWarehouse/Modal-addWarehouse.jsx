import React, { useState, useEffect } from 'react';
import cx from 'classnames';

// Hooks
import useFetch from '../../../../hooks/useFetch';
import {setActiveWarehouse, setErrorsWarehouse, setMessageWarehouse, setResetWarehouse, setIsLoadingWarehouse, setDefaultWarehouse} from '../../../../features/modal/add-warehouseSlice';

// Redux
import { useDispatch, useSelector } from 'react-redux';

//Styles
import styles from '../MyModal.module.scss';

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import Modal from '../MyModal2.jsx';
import MyButton from '../../Buttons/ButtonSend.jsx';
import MyInput from '../../Input/MyInput.jsx';


function ModalAddWarehose() {
  const dispatch = useDispatch();

  // Redux State
  const {
    active,
    errors,
    message,
    reset,
    isLoading
  } = useSelector((state) => state.modal_add_warehouse);

  // Local State
  const [warehouse, setWarehouse] = useState([]);


  return (
    <Modal
      active={active}
      setActive={() => {
        dispatch(setActiveWarehouse({ active: false }));
      }}
      title={`Добавление склада`}
      message={message}
      errors={errors}
      isLoading={isLoading}
    >
      <form className={styles.form}>
        <div className={styles.itemsContainer}>

            <div className={styles.item}>
                <h4>1. Код филиала</h4>
                <p className={styles.description}>
                  Например, СПБ: 65, МСК: М5
                </p>
                <MyInput
                  type="text"
                  title="Код филиала"
                  //validation={validation.url.status}
                  //value={url}
                />
            </div>

            <div className={styles.item}>
                <h4>2. Краткое наименование</h4>
                <p className={styles.description}>
                  Например, Долгоозёрная, 12к3
                </p>
                <MyInput
                  type="text"
                  title="Краткое наименование"
                  //validation={validation.url.status}
                  //value={url}
                />
            </div>

            <div className={styles.item}>
                <h4>3. Адрес</h4>
                <p className={styles.description}>
                  Например, 197373, Санкт-Петербург, улица Долгоозерная, дом 12, корпус 3
                </p>
                <MyInput
                  type="text"
                  title="Адрес"
                  //validation={validation.url.status}
                  //value={url}
                />
            </div>

            <div className={styles.buttons}>
              <MyButton
                type="send"
                //action={rate}
                title="Добавить"
                loadingTitle="Добавлю"
                loading={isLoading}
              />
            </div>


        </div>
      </form>
    </Modal>
  );
}

export default ModalAddWarehose;
