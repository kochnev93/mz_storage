import React, { useState, useEffect } from 'react';

// Hooks
import authHeader from '../../../../services/auth-header';
import { useAuth } from '../../../../hooks/use-auth';
import useFetch from '../../../../hooks/useFetch';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSomeTransfer } from '../../../../features/modal/transfer-someProductsSlice';

//Styles
import styles from './Modal-transfersSomeProducts.module.scss';

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import Modal from '../MyModal2.jsx';
import MyButton from '../../Buttons/ButtonSend.jsx';
import MyInput from '../../Input/MyInput.jsx';


function ModalTransfersSomeProducts() {
  const dispatch = useDispatch();
  const user = useAuth();

  // Redux
  const active = useSelector((state) => state.modal_transfer_someProducts.active);
  // const product = useSelector((state) => state.modal_transfer_product.product);
  // const errors = useSelector((state) => state.modal_transfer_product.errors);
  // const message = useSelector((state) => state.modal_transfer_product.message);
  // const reset = useSelector((state) => state.modal_transfer_product.reset);
  // const isLoading = useSelector(
  //   (state) => state.modal_transfer_product.isLoading
  // );

  // Local State
  // const [warehouse, setWarehouse] = useState([]);
  // const [validationWarehouse, setValidationWarehouse] = useState(true);
  // const [count, setCount] = useState('');
  // const [validationCount, setValidationCount] = useState(true);

  const { fetchNow } = useFetch();



  return (
    <Modal
      active={active}
      size={'big'}
      setActive={() => {
        dispatch(setActiveSomeTransfer({ active: false }));
      }}
      title={`Перемещение товара`}
      // message={message}
      // errors={errors}
      // isLoading={isLoading}
    >
              <MyDropdown
              id="receiptProductModal_category"
              title="Категория"
              placeholder="Категория товара"
              multiple={false}

              validation={true}

              url={'get_category'}
            />

            <table className={styles.product_table}>
              <thead>
                <tr>
                  <th>Наименование</th>
                  <th>SN</th>
                  <th>Количество</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>              <MyDropdown
              id="receiptProductModal_category"
              title="Категория"
              placeholder="Категория товара"
              multiple={false}

              validation={true}

              url={'get_category'}
            /></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
      
    </Modal>
  );
}

export default ModalTransfersSomeProducts;
