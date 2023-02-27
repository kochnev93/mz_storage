import React, { useState } from "react";

// Router
import { Outlet, Link } from "react-router-dom";

// Styles
import styles from "../style.module.scss";

// Component
import Navbar from "../../components/Navbar/Navbar.jsx";
import Header from "../../components/Header/Header.jsx";
import ModalAddProduct from "../../components/ui/Modal/Modal-addproduct/Modal-addProduct.jsx";
import ModalAboutProduct from "../../components/ui/Modal/Modal-aboutProduct/MyModal-aboutProduct.jsx";
import ModalReceiptProduct from "../../components/ui/Modal/Modal-receiptProduct/MyModal-receiptProduct.jsx";
import { MainWrapper } from "../../components/MainWrapper.jsx";

// Redux
import { useDispatch } from "react-redux";
import { setActive } from "../../features/modal/add-productSlice.js";
import { setActiveReceipt } from "../../features/modal/receipt-productSlice.js";

export const Admin = () => {
  const dispatch = useDispatch();

  return (
    <MainWrapper header_title="Администратор" title="Панель управления">
      <nav>
        <ul>
          <li>
            <Link to="users">Пользователи</Link>
          </li>
        </ul>
      </nav>

      <button onClick={() => dispatch(setActive({ active: true }))}>
        Добавить товар
      </button>

      <button onClick={() => dispatch(setActiveReceipt({ active: true }))}>
        Приход товара
      </button>

      <Outlet />
    </MainWrapper>
  );
};
