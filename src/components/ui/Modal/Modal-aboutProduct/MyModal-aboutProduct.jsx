import React, { useState, useEffect } from 'react';
import cx from 'classnames';

// Hooks
import authHeader from '../../../../services/auth-header';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../../../features/modal/about-productSlice';

//Styles

// Components
import MyDropdown from '../../Dropdown/MyDropdown.jsx';
import MyInput from '../../Input/MyInput.jsx';
import MyButton from '../../Buttons/ButtonSend.jsx';
import Modal from '../MyModal2.jsx';

function ModalAboutProduct() {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);

  const active = useSelector((state) => state.modal_about_product.active);
  const product = useSelector((state) => state.modal_about_product.product_id);
  const errors = useSelector((state) => state.modal_about_product.errors);
  const message = useSelector((state) => state.modal_about_product.message);
  const reset = useSelector((state) => state.modal_about_product.reset);
  const isLoading = useSelector((state) => state.modal_about_product.isLoading);

  useEffect(() => {
    if (product !== null) {
      fetchData(product);
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
        if (res.ok) {
          return res.json();
        } else {
          let error = new Error(res.statusText);
          error.response = res;
          throw error;
        }
      })
      .then((result) => {
        console.log(result);
        
      })
      .catch((err) => {
        console.log(err);
      });
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
    >
      <h1>Товар с id = {product}</h1>
    </Modal>
  );
}

export default ModalAboutProduct;
