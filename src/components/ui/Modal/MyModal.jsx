import React from 'react';
import cx from 'classnames';
import styles from './myModal.module.scss';
import { AiOutlineClose } from 'react-icons/Ai';
import MyDropdown from './../Dropdown/MyDropdown.jsx';

function Modal({ active, setActive }) {
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
                        <label></label>
                        <MyDropdown multiple={true} />
                    </div>

                    <div className={styles.myModal_form_item}>
                        <label></label>
                        <MyDropdown multiple={false} />
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
                    <input type="submit" value="Добавить" onClick={(e) => {e.preventDefault()}}/>
                </div>
            </form>
          </div>

          <div className={styles.myModal_footer}>Данная форма предназначена для добавления товара в номенклатуру. Для оформления прихода воспользуйтесь другой формой.</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
