import React, { useState, useEffect } from 'react';
import cx from 'classnames';

// Hooks
import useFetch from '../../../../hooks/useFetch';
import {setActiveWarehouse, setErrorsWarehouse, setMessageWarehouse, setResetWarehouse, setIsLoadingWarehouse, setDefaultWarehouse} from '../../../../features/modal/add-warehouseSlice';

// Redux
import { useDispatch, useSelector } from 'react-redux';

//Styles
import styles from './Modal-addWarehouse.module.scss';

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
        <h1>654987</h1>
    </Modal>
  );
}

export default ModalAddWarehose;
