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
  setDefaultSomeTransfer,
  setWarehouseFromSomeTransfer,
  setWarehouseToSomeTransfer,
  setCountSomeTransfer,
} from "../../../../features/modal/transfer-someProductsSlice";

//Styles
import styles from "./Modal-transfersSomeProducts.module.scss";
import stylesModal from "../MyModal.module.scss";
import { ImArrowRight } from "react-icons/Im";

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

  const resetForm = () => {
    dispatch(setResetSomeTransfer({ reset: true }));
    dispatch(setDefaultSomeTransfer());
  };

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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 2fr",
            }}
          >
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
                setReset={() =>
                  dispatch(setResetSomeTransfer({ reset: false }))
                }
                url={"get_warehouse"}
              />

              {!validation?.warehouseFrom?.status && (
                <div className={stylesModal.error_message}>
                  {validation.warehouseFrom.message}
                </div>
              )}
            </div>

            {warehouseFrom.length != 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "30px",
                }}
              >
                <ImArrowRight style={{ fill: "var(--main-color)" }} />
              </div>
            )}

            {warehouseFrom.length != 0 && (
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
                  setReset={() =>
                    dispatch(setResetSomeTransfer({ reset: false }))
                  }
                  url={"get_warehouse"}
                />

                {!validation?.warehouseTo?.status && (
                  <div className={stylesModal.error_message}>
                    {validation.warehouseTo.message}
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 2fr",
            }}
          >
            {warehouseTo.length != 0 && (
              <div className={stylesModal.item}>
                <h4>3. Выберите товар / товары</h4>
                <p className={stylesModal.description}>
                  Выберите позиции для перемещения
                </p>
                <MyDropdown
                  id="receiptProductModal_productTo"
                  title="Товар"
                  placeholder="Товар"
                  multiple={true}
                  changeValue={(res) => {
                    dispatch(setProductSomeTransfer(res));
                  }}
                  validation={validation.products.status}
                  reset={reset}
                  setReset={() =>
                    dispatch(setResetSomeTransfer({ reset: false }))
                  }
                  url={"get_warehouse"}
                />

                {!validation?.products?.status && (
                  <div className={stylesModal.error_message}>
                    {validation.products.message}
                  </div>
                )}
              </div>
            )}

            {products.length != 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "30px",
                }}
              >
                <ImArrowRight style={{ fill: "var(--main-color)" }} />
              </div>
            )}

            {products.length != 0 && (
              <div
                className={stylesModal.item}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <h4>4. Укажите количество</h4>
                <p className={stylesModal.description}>
                  Проверьте таблицу ниже и укажите количество перемещаемого
                  товара
                </p>
              </div>
            )}
          </div>
        </div>
      </form>

      {products.length != 0 && (
        <table className={styles.product_table}>
          <thead>
            <tr>
              <th>Номер</th>
              <th>ID</th>
              <th>Наименование</th>
              <th>SN</th>
              <th>{`Количество (${warehouseFrom[0]?.warehouse_title})`}</th>
              <th>Количество (для перемещения)</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.sn}</td>
                  <td>{item.accounting_sn ? "1" : item.count}</td>
                  <td>
                    {!item.accounting_sn && (
                      <MyInput
                        type="number"
                        title="Количество"
                        changeValue={(value) => {
                          dispatch(
                            setCountSomeTransfer({
                              countTransfer: value,
                              id_product: item.id,
                            })
                          );
                        }}
                        validation={item.validationCountTransfer}
                        value={item.countTransfer}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className={styles.buttons}>
        <MyButton
          type="clear"
          action={resetForm}
          title="Сбросить"
          loadingTitle="Сбросить"
          loading={isLoading}
        />
        <MyButton
          type="send"
          //action={}
          title="Переместить"
          loadingTitle="Перемещаю"
          loading={isLoading}
        />
      </div>
    </Modal>
  );
}

export default ModalTransfersSomeProducts;
