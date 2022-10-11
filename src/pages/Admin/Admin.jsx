import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../features/modal/add-productSlice.js';
import { Outlet, Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Header from '../../components/Header/Header.jsx';

import styles from '../style.module.scss';
import Modal from '../../components/ui/Modal/MyModal.jsx';
import ModalAddProduct from '../../components/ui/Modal/Modal-addproduct/Modal-addProduct.jsx';




export const Admin = () => {
  //const [modalWindow, setModalWindow] = useState(false);
  const dispatch = useDispatch();

  return (
    <section className={styles.main_section}>
      <ModalAddProduct />
      <Header title='Номенклатура'/>
      <Navbar />
      <main className={styles.main}>
        <h1>Панель управления</h1>
        <ul>
          <li><Link to="nomenclature">Номенклатура</Link></li>
          <li><Link to="products">Товары</Link></li>
          <li><Link to="products">Характеристики товаров</Link></li>
          <li><Link to="products">Склады</Link></li>
          <li><Link to="products">Категории</Link></li>
          <li><Link to="products">Пользователи</Link></li>
          <li><Link to="products">История</Link></li>
        </ul>
        <button onClick={() => dispatch( setActive({active:true}) )}>Добавить товар</button>
        <Outlet />
      </main>
    </section>
  );
};
