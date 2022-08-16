import React, {useState} from 'react';
import cx from 'classnames';
import styles from './myModal.module.scss';
import { AiOutlineClose } from 'react-icons/Ai';
import MyDropdown from './../Dropdown/MyDropdown.jsx';

function Modal({ active, setActive }) {
  const [warehouse, setWarehouse] = useState([]);
  const [validationWarehouse, setValidationWarehouse] = useState(true);
  const [category, setCategory] = useState([]);
  const [validationCategory, setValidationCategory] = useState(true);

  const validateAddForm = () => {
    warehouse.length === 0 ? setValidationWarehouse(false) : setValidationWarehouse(true);
    category.length === 0 ? setValidationCategory(false) : setValidationCategory(true);
  }

  const addProduct = (e) => {
    e.preventDefault();
    validateAddForm();
    console.log(warehouse);
    console.log(category);
  }

  return (
    <div
      className={cx(styles.myModal_overlay, { [styles.active]: active })}
      onClick={() => setActive(false)}
    >
      <div className={styles.myModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.myModal_wrapper}>
          <div className={styles.myModal_header}>
            <div>Добавить товар</div>
            <AiOutlineClose
              className={styles.close_icon}
              onClick={() => setActive(false)}
            />
          </div>

          <div className={styles.myModal_body}>
            <form className={styles.myModal_form}>
              <div className={styles.myModal_form_itemsContainer}>
                <div className={styles.myModal_form_item}>
                  <MyDropdown
                    id="warehouse"
                    title="Склад"
                    placeholder="Выберите склад"
                    multiple={false}
                    changeValue = {setWarehouse}
                    validation = {validationWarehouse}
                  />
                </div>

                <div className={styles.myModal_form_item}>
                  <MyDropdown
                    id="category"
                    title="Категория"
                    placeholder="Выберите категорию"
                    multiple={false}
                    changeValue = {setCategory}
                    validation = {validationCategory}
                  />
                </div>

                <div className={styles.myModal_form_item}>
                  <label>Наименование</label>
                  <input type="text" />
                </div>

                <div className={styles.myModal_form_item}>
                  <label>Товар</label>
                  <input type="text" />
                </div>

                <div className={styles.myModal_form_item}>
                  <label>Товар</label>
                  <input type="text" />
                </div>
              </div>

              <div className={styles.myModal_form_buttons}>
                <input
                  type="submit"
                  value="Добавить"
                  onClick={addProduct}
                />
              </div>
            </form>
          </div>

          <div className={styles.myModal_footer}>
            Данная форма предназначена для добавления товара в номенклатуру. Для
            оформления прихода воспользуйтесь другой формой.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
