import React, { useState } from "react";
import styles from "./header.module.scss";
import cx from "classnames";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setHeader } from "../../features/header/headerSlice.js";
import { removeUser } from "../../features/users/userSlice";

import { MdOutlineMenu } from "react-icons/Md";
import { IoMdExit } from "react-icons/Io";
import Theme from "../Theme/Theme.jsx";
import ModalDialog from "../ui/Modal/MyModalDialog.jsx";

function Header({ title = "Склад" }) {
  const [activeDialog, setActiveDialog] = useState(false);

  const dispatch = useDispatch();
  const menuIsOpen = useSelector((state) => state.button_menu.ButtonMenuOpen);

  const closeDialog = (answer) => {
    setActiveDialog(false);
    if (answer) {
      localStorage.removeItem("mz_storage_user");
      dispatch(removeUser());
    }
  };
  return (
    <>
      <ModalDialog
        active={activeDialog}
        action={closeDialog}
        title="Выйти из приложения?"
        subtitle=""
        succsesTitle='Да'
        cancelTitle='Отмена'
      />

      <header className={cx(styles.header, { [styles.open]: menuIsOpen })}>
        <div className={styles.wrapperHeader}>
          <div className={styles.logo}>
            <MdOutlineMenu onClick={ () => dispatch(setHeader({open: true})) } />
            <h3>{title}</h3>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Theme className={styles.theme_icon} />
            <IoMdExit
              className={styles.logout_icon}
              onClick={() => {
                setActiveDialog(true);
              }}
              title="Выйти"
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
