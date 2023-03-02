import React, { useState } from "react";
import cx from "classnames";

// Router
import { Outlet, Link } from "react-router-dom";

// Styles
import styles from "./AdminPage.module.scss";

// Component
import { MainWrapper } from "../../components/MainWrapper.jsx";
import ModalAboutUser from "../../components/ui/Modal/Modal-aboutUser/MyModal-aboutUser.jsx";
import ModalAddUser from "../../components/ui/Modal/Modal-addUser/Modal-addUser.jsx";

// Redux
import { useDispatch } from "react-redux";

export const Admin = () => {
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState(null);

  const adminMenu = [
    {
      title: "Пользователи",
      link: "users",
    },
    {
      title: "Пользователи2",
      link: "users",
    },
    {
      title: "Пользователи3",
      link: "users",
    },
    {
      title: "Пользователи4",
      link: "users4",
    },
  ];

  return (
    <>
      <ModalAddUser />
      <ModalAboutUser />
      <MainWrapper header_title="Администратор" title="Панель управления">
        <nav>
          <ul className={styles.admin_menu}>
            {adminMenu.map((item, index) => {
              return (
                <li
                  className={cx(styles.admin_link, {
                    [styles.active]: index === activeLink,
                  })}
                  key={index}
                >
                  <Link
                    to={item.link}
                    onClick={() => {
                      setActiveLink(index);
                    }}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Outlet />
      </MainWrapper>
    </>
  );
};
