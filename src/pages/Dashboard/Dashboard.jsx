import React from 'react';

import DashboardTable from '../../components/DashboardTable/DashboardTable.jsx';
import ModalAboutProduct from '../../components/ui/Modal/Modal-aboutProduct/MyModal-aboutProduct.jsx';
import ModalTransferProduct from '../../components/ui/Modal/Modal-transferProduct/MyModal-transferProduct.jsx';
import ModalRateProduct from '../../components/ui/Modal/Modal-rateProduct/MyModal-rateProduct.jsx';
import { MainWrapper } from '../../components/MainWrapper.jsx';


export const Dashboard = () => {
  return (
    <>
      <ModalAboutProduct />
      <ModalTransferProduct />
      <ModalRateProduct />
      <MainWrapper header_title="Склад" title="Склад">
        <DashboardTable />
      </MainWrapper>
    </>
  );
};
