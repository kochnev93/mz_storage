import React from 'react';
import cx from 'classnames';

//Styles
import styles from './myModal.module.scss';
import { AiOutlineClose } from 'react-icons/Ai';

// Redux
import { useDispatch, useSelector } from 'react-redux';

function Modal({
  active,
  setActive,
  title,
  subtitle = null,
  footer,
  message,
  errors,
  isLoading,
  children,
  size = 'medium'
}) {
  const dispatch = useDispatch();
  const statusApp = useSelector((state) => state.appStatus);
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
      className={cx(
        styles.myModal_overlay, { 
          [styles.active]: active
        })}
      onClick={() => setActive()}
    >
      <div 
        className={cx(styles.myModal, { 
            [styles.medium]: size === 'medium',
            [styles.small]: size === 'small',
            [styles.big]: size === 'big',
        })} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.myModal_wrapper}>
          <div className={styles.myModal_header}>
            <div>
              <div>{title || 'Модальное окно'}</div>
              {subtitle && <div className={styles.subtitle}>{subtitle}</div> }
            </div>

            <div className={styles.myModal_toolbar}>
              <div
                className={cx(styles.myModal_message, {
                  [styles.succses]: statusApp.status
                    ? !errors
                    : statusApp.error,
                  [styles.error]: statusApp.status ? errors : statusApp.error,
                })}
              >
                {statusApp.status ? message : statusApp.error}
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

          <div className={styles.myModal_footer}>{footer}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
