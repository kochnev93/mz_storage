import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveAddUser,
  setUser_AddUser,
} from "../../../../features/modal/add-userSlice.js";
import MyInput from "../../Input/MyInput.jsx";
import { FormItemModal } from "../FormItemModal/FormItemModal.jsx";
import { FormModal } from "../FormModal/FormModal.jsx";

// Components
import Modal from "../MyModal2.jsx";

function ModalAddUser() {
  const dispatch = useDispatch();
  const { active, message, errors, isLoading, reset, user } = useSelector(
    (state) => state.modal_add_user
  );

  const addUser = () => {
    console.log("add user");
  };

  const resetForm = () => {
    console.log("resetForm");
  };

  return (
    <Modal
      active={active}
      setActive={() => {
        dispatch(setActiveAddUser({ active: false }));
      }}
      title="Добавить пользователя"
      message={message}
      errors={errors}
      isLoading={isLoading}
      footer={"Заполните все поля и нажмите Добавить"}
      actions={{
        visible: true,
        buttonSend: {
          action: addUser,
          title: "Добавить",
          loadingTitle: "Добавляю",
          loading: isLoading,
        },
        buttonClear: {
          action: resetForm,
          title: "Сбросить",
          loadingTitle: "Сбросить",
          loading: isLoading,
        },
      }}
    >
      <>
        <FormModal columns={1}>
          <FormItemModal>
            <MyInput
              type="text"
              title="Имя"
              disabled={false}
              changeValue={(value) => {
                dispatch(setUser_AddUser({ name: value }));
              }}
              validation={true}
              value={user.name}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="text"
              title="Фамилия"
              disabled={false}
              changeValue={(value) => {
                dispatch(setUser_AddUser({ surname: value }));
              }}
              validation={true}
              value={user.surname}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="email"
              title="E-mail"
              disabled={true}
              //changeValue={setProduct}
              validation={true}
              //value={currentUser[0]?.id}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="tel"
              title="Номер телефона"
              disabled={true}
              //changeValue={setProduct}
              validation={true}
              //value={currentUser[0]?.id}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="text"
              title="Логин"
              disabled={true}
              //changeValue={setProduct}
              validation={true}
              //value={currentUser[0]?.id}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="password"
              title="Пароль"
              disabled={false}
              //changeValue={setProduct}
              validation={true}
              //value={currentUser[0]?.id}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="password"
              title="Повторите пароль"
              disabled={false}
              //changeValue={setProduct}
              validation={true}
              //value={currentUser[0]?.id}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="text"
              title="Роль"
              disabled={true}
              //changeValue={setProduct}
              validation={true}
              //value={currentUser[0]?.id}
            />
          </FormItemModal>
        </FormModal>
      </>
    </Modal>
  );
}

export default ModalAddUser;
