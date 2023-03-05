import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveAddUser,
  setUser_AddUser,
  setDefaultAddUser,
  setMessageAddUser,
  setValidationAddUser,
  setDefaultValidationAddUser,
} from '../../../../features/modal/add-userSlice.js';
import { useTranslit } from '../../../../hooks/useTranslit.js';
import MyInput from '../../Input/MyInput.jsx';
import { FormItemError } from '../FormItemModal/FormItemError.jsx';
import { FormItemModal } from '../FormItemModal/FormItemModal.jsx';
import { FormModal } from '../FormModal/FormModal.jsx';

// Components
import Modal from '../MyModal2.jsx';
import { validationAddUsertForm } from './validationAddUser.js';

function ModalAddUser() {
  const dispatch = useDispatch();
  const { active, message, errors, isLoading, reset, user, validation } =
    useSelector((state) => state.modal_add_user);

  const validationForm = () => {
    dispatch(setDefaultValidationAddUser());

    const values = { ...user };
    const tempValidation = JSON.parse(JSON.stringify(validation));
    const validateForm = validationAddUsertForm(tempValidation, values);


    console.log('validateForm', validateForm);


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
    validationForm();
  };

  const resetForm = () => {
    dispatch(setDefaultAddUser());
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
      footer={'Заполните все поля и нажмите Добавить'}
      actions={{
        visible: true,
        buttonSend: {
          action: addUser,
          title: 'Добавить',
          loadingTitle: 'Добавляю',
          loading: isLoading,
        },
        buttonClear: {
          action: resetForm,
          title: 'Сбросить',
          loadingTitle: 'Сбросить',
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
                if (!user.login) {
                  dispatch(
                    setUser_AddUser({
                      login: useTranslit(user.surname).toLowerCase(),
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
              type="tel"
              title="Номер телефона"
              changeValue={(value) => {
                dispatch(setUser_AddUser({ phone: value }));
              }}
              validation={true}
              value={user.phone}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="text"
              title="Логин"
              changeValue={(value) => {
                dispatch(setUser_AddUser({ login: value }));
              }}
              validation={true}
              value={user.login}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="password"
              title="Пароль"
              changeValue={(value) => {
                dispatch(setUser_AddUser({ pass: value }));
              }}
              validation={true}
              value={user.pass}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="password"
              title="Повторите пароль"
              changeValue={(value) => {
                dispatch(setUser_AddUser({ repeat_pass: value }));
              }}
              validation={true}
              value={user.repeat_pass}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="text"
              title="Роль"
              changeValue={(value) => {
                dispatch(setUser_AddUser({ role: value }));
              }}
              validation={true}
              value={user.role}
            />
          </FormItemModal>
        </FormModal>
      </>
    </Modal>
  );
}

export default ModalAddUser;
