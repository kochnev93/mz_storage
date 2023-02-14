import React from 'react';

// Style 
import styles from '../style/styles.module.scss';

// Components
import Header from './Header/Header.jsx';
import Navbar from './Navbar/Navbar.jsx';

// Modal
import ModalAddProduct from './ui/Modal/Modal-addproduct/Modal-addProduct.jsx';
import ModalReceiptProduct from './ui/Modal/Modal-receiptProduct/MyModal-receiptProduct.jsx';
import ModalTransferProduct from './ui/Modal/Modal-transferProduct/MyModal-transferProduct.jsx';
import ModalAboutProduct from './ui/Modal/Modal-aboutProduct/MyModal-aboutProduct.jsx';
import ModalAddWarehose from './ui/Modal/Modal-addWarehouse/Modal-addWarehouse.jsx';
import ModalTransfersSomeProducts from './ui/Modal/Modal-transfersSomeProducts/Modal-transfersSomeProducts.jsx';


export const MainWrapper = ({header_title, title = 'Страница без названия', children}) => {
  return (
    <section className={styles.main_section}>
      <ModalAddProduct/>
      <ModalReceiptProduct/>
      <ModalTransferProduct/>
      <ModalAboutProduct/>
      <ModalAddWarehose/>
      <ModalTransfersSomeProducts />

      <Header title={header_title}/>

      <Navbar />

      <main className={styles.main}>
        <h1>{title}</h1>
        {children}
      </main>
    </section>
  );
};