import React, { useState } from 'react';
import cx from 'classnames';
import authHeader from '../../../services/auth-header';


//Styles
import styles from './myModal.module.scss';
import { AiOutlineClose } from 'react-icons/Ai';

// Components
import MyDropdown from '../Dropdown/MyDropdown.jsx';
import MyInput from '../Input/MyInput.jsx';
import MyButton from '../Buttons/ButtonSend.jsx';

function ModalProduct({ active, setActive, product }) {
  const [errors, setErrors] = useState(false);
  const [message, setMessage] = useState('');

  const resetForm = (e) => {};

  const resetValidation = () => {};

  const addProduct = (e) => {
    e.preventDefault();
    if (validateAddForm()) {
      setIsLoading(true);
      let myHeaders = new Headers();
      myHeaders.append('content-type', 'application/json');
      myHeaders.append('Authorization', `${authHeader()}`);

      let data = JSON.stringify({
        name: product,
        sn: serialNumber,
        warehouse: warehouse[0],
        category: category[0],
      });

      let requestOptions = {
        //mode: 'no-cors',
        method: 'POST',
        headers: myHeaders,
        body: data,
      };

      fetch('http://localhost:3001/api/addProduct', requestOptions)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            return res.json();
          } else {
            let error = new Error(res.statusText);
            error.response = res;
            throw error;
          }
        })
        .then((result) => {
          if (result.error) {
            setErrors(true);
            setMessage(result.error);
          } else {
            setMessage(result.message);
          }

          setTimeout(() => {
            setIsLoading(false);
            console.log('load end');
          }, 100);
        })
        .catch((err) => {
          setErrors(true);
          setIsLoading(false);
          setMessage(`Ошибка сервера`);
        });
    }
  };

  return (
    <div
      className={cx(styles.myModal_overlay, { [styles.active]: active })}
      onClick={() => setActive({visible: false, product: null})}
    >
      <div className={styles.myModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.myModal_wrapper}>
          <div className={styles.myModal_header}>
            <div>Информация о товаре</div>

            <div className={styles.myModal_toolbar}>
              <div
                className={cx(styles.myModal_message, {
                  [styles.succses]: !errors,
                  [styles.error]: errors,
                })}
              >
                {'error'}
              </div>

              <AiOutlineClose
                className={styles.close_icon}
                onClick={() => setActive({visible: false, product: null})}
              />
            </div>
          </div>

          <div
            className={cx(styles.myModal_body, { [styles.loading]: false })}
          >
            <form className={styles.myModal_form}>
              <div className={styles.myModal_form_itemsContainer}>Товар с id={product}</div>
            </form>
          </div>

          <div className={styles.myModal_footer}></div>
        </div>
      </div>
    </div>
  );
}

export default ModalProduct;
