import React from "react";
import cx from "classnames";

//Styles
import styles from "./MyModalDialog.module.scss";
import MyButton from "../Buttons/ButtonSend.jsx";

function ModalDialog({active, action, title, subtitle, succsesTitle, cancelTitle, children}) {
  return (
    <div
      className={cx(styles.dialog_overlay, {
        [styles.active]: active,
      })}
    >
      <div className={cx(styles.dialog)} onClick={(e) => e.stopPropagation()}>
        <div className={styles.dialog_wrapper}>
          <div className={styles.dialog_header}>
            <div>{title || "Модальное окно"}</div>
          </div>

          <div className={cx(styles.dialog_body)}>
              {subtitle}
              {children}
          </div>

          <div className={cx(styles.dialog_footer)}>
          <MyButton
              type="clear"
              action={() => {action(false)}} 
              title={cancelTitle ? cancelTitle : 'Да'} 
            />

            <MyButton
              type="send"
              action={() => {action(true)}}
              title={succsesTitle ? succsesTitle : 'Да'} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDialog;
