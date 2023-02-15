import React, { useState, useEffect } from "react";

// Hooks
import authHeader from "../../../../services/auth-header";
import { useAuth } from "../../../../hooks/use-auth";
import useFetch from "../../../../hooks/useFetch";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveSomeTransfer,
  setProductSomeTransfer,
  setResetSomeTransfer,
  setWarehouseFromSomeTransfer,
  setWarehouseToSomeTransfer,
} from "../../../../features/modal/transfer-someProductsSlice";

//Styles
import styles from "./Modal-transfersSomeProducts.module.scss";
import stylesModal from "../MyModal.module.scss";

// Components
import MyDropdown from "../../Dropdown/MyDropdown.jsx";
import Modal from "../MyModal2.jsx";
import MyButton from "../../Buttons/ButtonSend.jsx";
import MyInput from "../../Input/MyInput.jsx";

function ModalTransfersSomeProducts() {
  const dispatch = useDispatch();
  const user = useAuth();

  // Redux State
  const {
    active,
    errors,
    message,
    reset,
    isLoading,
    products,
    warehouseFrom,
    warehouseTo,
    validation,
  } = useSelector((state) => state.modal_transfer_someProducts);

  const { fetchNow } = useFetch();

  return (
    <Modal
      active={active}
      size={"big"}
      setActive={() => {
        dispatch(setActiveSomeTransfer({ active: false }));
      }}
      title={`Перемещение товара(ов)`}
      message={message}
      errors={errors}
      isLoading={isLoading}
    >
      <form className={stylesModal.form}>
        <div className={stylesModal.itemsContainer}>
          <div className={stylesModal.item}>
            <h4>1. Выберите склад (откуда)</h4>
            <p className={stylesModal.description}>
              Выберите склад откуда выполняется перемещение
            </p>
            <MyDropdown
              id="receiptProductModal_warehouseFrom"
              title="Склад (откуда)"
              placeholder="Откуда"
              multiple={false}
              changeValue={(res) => {
                dispatch(setWarehouseFromSomeTransfer(res));
              }}
              validation={validation.warehouseFrom.status}
              reset={reset}
              setReset={() => dispatch(setResetSomeTransfer({ reset: false }))}
              url={"get_warehouse"}
            />

            {!validation?.warehouseFrom?.status && (
              <div className={stylesModal.error_message}>
                {validation.warehouseFrom.message}
              </div>
            )}
          </div>

          <div className={stylesModal.item}>
            <h4>2. Выберите склад (куда)</h4>
            <p className={stylesModal.description}>
              Выберите склад куда выполняется перемещение
            </p>
            <MyDropdown
              id="receiptProductModal_warehouseTo"
              title="Склад (куда)"
              placeholder="Куда"
              multiple={false}
              changeValue={(res) => {
                dispatch(setWarehouseToSomeTransfer(res));
              }}
              validation={validation.warehouseTo.status}
              reset={reset}
              setReset={() => dispatch(setResetSomeTransfer({ reset: false }))}
              url={"get_warehouse"}
            />

            {!validation?.warehouseTo?.status && (
              <div className={stylesModal.error_message}>
                {validation.warehouseTo.message}
              </div>
            )}
          </div>

          <div className={stylesModal.item}>
            <h4>3. Выберите товар</h4>
            <p className={stylesModal.description}>
              Выберите позиции для перемещения
            </p>
            <MyDropdown
              id="receiptProductModal_productTo"
              title="Товар"
              placeholder="Товар"
              multiple={false}
              changeValue={(res) => {
                dispatch(setProductSomeTransfer(res));
              }}
              validation={validation.products.status}
              reset={reset}
              setReset={() => dispatch(setResetSomeTransfer({ reset: false }))}
              url={"get_warehouse"}
            />

            {!validation?.products?.status && (
              <div className={stylesModal.error_message}>
                {validation.products.message}
              </div>
            )}
          </div>
        </div>
      </form>

      <table className={styles.product_table}>
        <thead>
          <tr>
            <th>Номер</th>
            <th>Наименование</th>
            <th>SN</th>
            <th>Количество</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td>
              <MyDropdown
                id="receiptProductModal_category"
                title="Категория"
                placeholder="Категория товара"
                multiple={false}
                validation={true}
                url={"get_category"}
              />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
}

export default ModalTransfersSomeProducts;
