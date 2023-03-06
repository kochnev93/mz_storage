import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveAddUser,
  setUser_AddUser,
  setDefaultAddUser,
  setMessageAddUser,
  setValidationAddUser,
  setDefaultValidationAddUser,
} from "../../../../features/modal/add-userSlice.js";

// Hooks
import { validationAddUsertForm } from "./validationAddUser.js";
import { useTranslit } from "../../../../hooks/useTranslit.js";

// Components
import Modal from "../MyModal2.jsx";
import MyInput from "../../Input/MyInput.jsx";
import { FormItemError } from "../FormItemModal/FormItemError.jsx";
import { FormItemModal } from "../FormItemModal/FormItemModal.jsx";
import { FormModal } from "../FormModal/FormModal.jsx";


function ModalAddUser() {
  const dispatch = useDispatch();

  const { active, message, errors, isLoading, reset, user, validation } =
    useSelector((state) => state.modal_add_user);

  const validationForm = () => {
    dispatch(setDefaultValidationAddUser());

    const values = { ...user };
    const tempValidation = JSON.parse(JSON.stringify(validation));
    const validateForm = validationAddUsertForm(tempValidation, values);

    if (validateForm == 0) {
      return true;
    } else {
      dispatch(setValidationAddUser({ ...tempValidation }));
      dispatch(
        setMessageAddUser({
          errors: true,
          message: `Количество ошибок: ${validateForm}`,
        })
      );
      return false;
    }
  };

  const addUser = () => {
    if (validationForm()){
      console.log('User add')
    } else {
      console.warn('USer not add')
    }

    console.log(user)
  };

  const resetForm = () => {
    dispatch(setDefaultAddUser());
  };


  const delSpaseStr = (str) => {
    return str.replace(/\s+/g, ' ').trim();
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
              validation={validation?.name.status}
              value={user.name}
              onBlur={() => {
                let temp = delSpaseStr(user.name) 
                let str = temp.charAt(0).toUpperCase() + temp.slice(1)
                dispatch(setUser_AddUser({ name: str }));
              }}
            />

            <FormItemError
              status={validation?.name.status}
              message={validation?.name.message}
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
              onBlur={() => {
                let temp = delSpaseStr(user.surname) 
                let str = temp.charAt(0).toUpperCase() + temp.slice(1)
                dispatch(setUser_AddUser({ surname: str }));

                if (!user.login) {
                  dispatch(
                    setUser_AddUser({
                      login: useTranslit(temp).toLowerCase(),
                    })
                  );
                } 
              }}
              validation={validation?.surname.status}
              value={user.surname}
            />

            <FormItemError
              status={validation?.surname.status}
              message={validation?.surname.message}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="email"
              title="E-mail"
              changeValue={(value) => {
                dispatch(setUser_AddUser({ email: value }));
              }}
              validation={validation?.email.status}
              value={user.email}
            />

            <FormItemError
              status={validation?.email.status}
              message={validation?.email.message}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="number"
              title="Номер телефона"
              changeValue={(value) => {
                dispatch(setUser_AddUser({ phone: value }));
              }}
              validation={validation?.phone.status}
              value={user.phone}
            />

            <FormItemError
              status={validation?.phone.status}
              message={validation?.phone.message}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="text"
              title="Логин"
              changeValue={(value) => {
                dispatch(setUser_AddUser({ login: value }));
              }}
              validation={validation?.login.status}
              value={user.login}
            />

            <FormItemError
              status={validation?.login.status}
              message={validation?.login.message}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="password"
              title="Пароль"
              changeValue={(value) => {
                dispatch(setUser_AddUser({ pass: value }));
              }}
              validation={validation?.pass.status}
              value={user.pass}
            />

            <FormItemError
              status={validation?.pass.status}
              message={validation?.pass.message}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="password"
              title="Повторите пароль"
              changeValue={(value) => {
                dispatch(setUser_AddUser({ repeat_pass: value }));
              }}
              validation={validation?.repeat_pass.status}
              value={user.repeat_pass}
            />

            <FormItemError
              status={validation?.repeat_pass.status}
              message={validation?.repeat_pass.message}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="text"
              title="Роль"
              changeValue={(value) => {
                dispatch(setUser_AddUser({ role: value }));
              }}
              validation={validation?.role.status}
              value={user.role}
            />

            <FormItemError
              status={validation?.role.status}
              message={validation?.role.message}
            />
          </FormItemModal>
        </FormModal>
      </>
    </Modal>
  );
}

export default ModalAddUser;
