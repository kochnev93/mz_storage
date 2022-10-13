import React, { useState } from 'react';

// Router
import { Outlet, Link } from 'react-router-dom';

// Styles
import styles from '../style.module.scss';

// Component
import Navbar from '../../components/Navbar/Navbar.jsx';
import Header from '../../components/Header/Header.jsx';
import ModalAddProduct from '../../components/ui/Modal/Modal-addproduct/Modal-addProduct.jsx';
import ModalAboutProduct from '../../components/ui/Modal/Modal-aboutProduct/MyModal-aboutProduct.jsx';
import ModalReceiptProduct from '../../components/ui/Modal/Modal-receiptProduct/MyModal-receiptProduct.jsx';

// Redux
import { useDispatch } from 'react-redux';
import { setActive } from '../../features/modal/add-productSlice.js';
import { setActiveReceipt } from '../../features/modal/receipt-productSlice.js';

export const Admin = () => {
  const dispatch = useDispatch();

  return (
    <section className={styles.main_section}>
      <ModalReceiptProduct />
      <ModalAboutProduct />
      <ModalAddProduct />
      <Header title="Номенклатура" />
      <Navbar />
      <main className={styles.main}>
        <h1>Панель управления</h1>
        <ul>
          <li>
            <Link to="nomenclature">Номенклатура</Link>
          </li>
          <li>
            <Link to="products">Товары</Link>
          </li>
          <li>
            <Link to="products">Характеристики товаров</Link>
          </li>
          <li>
            <Link to="products">Склады</Link>
          </li>
          <li>
            <Link to="products">Категории</Link>
          </li>
          <li>
            <Link to="products">Пользователи</Link>
          </li>
          <li>
            <Link to="products">История</Link>
          </li>
        </ul>
        <button onClick={() => dispatch(setActive({ active: true }))}>
          Добавить товар
        </button>
        <button onClick={() => dispatch(setActiveReceipt({ active: true }))}>
          Приход товара
        </button>
        <Outlet />
      </main>
    </section>
  );
};
