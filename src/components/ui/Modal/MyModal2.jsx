import React from 'react';
import cx from 'classnames';

//Styles
import styles from './myModal.module.scss';
import { AiOutlineClose } from 'react-icons/Ai';

function Modal({ active, setActive, title, footer, message, errors, isLoading, children }) {
  /*
  active - идентификатор видимости
  setActive - функиция, меняет видимость. Передается из родителя
  title - заголовок окна
  footer - текст внизу формы
  message - сообщение об ошибке
  errors - идентификатор ошибки
  isLoading - стадия загрузки
  children - потомки
  */

  return (
    <div
      className={cx(styles.myModal_overlay, { [styles.active]: active })}
      onClick={() => setActive()}
    >
      <div className={styles.myModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.myModal_wrapper}>
          <div className={styles.myModal_header}>
            <div>{title || 'Модальное окно'}</div>

            <div className={styles.myModal_toolbar}>
              <div
                className={cx(styles.myModal_message, {
                  [styles.succses]: !errors,
                  [styles.error]: errors,
                })}
              >
                {message}
              </div>

              <AiOutlineClose
                className={styles.close_icon}
                onClick={() => setActive()}
              />
            </div>
          </div>

          <div
            className={cx(styles.myModal_body, { [styles.loading]: isLoading })}
          >
            {children}
          </div>

          <div className={styles.myModal_footer}>
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
