import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveAddUser,
  setUser_AddUser,
  setRoleAddUser,
  setDefaultAddUser,
  setMessageAddUser,
  setValidationAddUser,
  setDefaultValidationAddUser,
  setResetAddUser,
  setIsLoadingAddUser,
} from '../../../../features/modal/add-userSlice.js';
import { addNewUser } from '../../../../features/admin/adminUsersSlice.js';


// Hooks
import { validationAddUsertForm } from './validationAddUser.js';
import { useTranslit } from '../../../../hooks/useTranslit.js';
import useFetch from '../../../../hooks/useFetch.js';

// Components
import Modal from '../MyModal2.jsx';
import MyInput from '../../Input/MyInput.jsx';
import { FormItemError } from '../FormItemModal/FormItemError.jsx';
import { FormItemModal } from '../FormItemModal/FormItemModal.jsx';
import { FormModal } from '../FormModal/FormModal.jsx';
import Dropdown from '../../Dropdown/MyDropdown-function.jsx';


function ModalAddUser() {
  const dispatch = useDispatch();

  const { active, message, errors, isLoading, reset, user, validation } =
    useSelector((state) => state.modal_add_user);

  const { roles } = useSelector((state) => state.app_state);

  const {fetchNow} = useFetch();

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

  const addUser = async (e) => {
      e.preventDefault();

      if (validationForm()) {
        dispatch(setIsLoadingAddUser({ isLoading: true }));
  
        let data = JSON.stringify({
          user: user
        });
  
        let requestOptions = {
          method: 'POST',
          body: data,
        };
  
        const result = await fetchNow(
        `${process.env.REACT_APP_API_SERVER}/register`,
        requestOptions
      );
  
   
  
      if (result.data) {
        console.log('res', result)
        dispatch(setMessageAddUser({ message: result.data }));
        dispatch(addNewUser(result.user))
      } else {
        console.warn(result.error);
        dispatch(setMessageAddUser({ errors: true, message: result.error }));
      }
  
      setTimeout(() => {
        dispatch(setIsLoadingAddUser({ isLoading: false }));
      }, 200);

    } else {
      console.warn('USer not add');
    }

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
              onBlur={() => {
                let temp = delSpaseStr(user.name);
                let str = temp.charAt(0).toUpperCase() + temp.slice(1);
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
                let temp = delSpaseStr(user.surname);
                let str = temp.charAt(0).toUpperCase() + temp.slice(1);
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
              title="Должность"
              disabled={false}
              changeValue={(value) => {
                dispatch(setUser_AddUser({ position: value }));
              }}
              validation={validation?.position.status}
              value={user.position}
              onBlur={() => {
                let temp = delSpaseStr(user.position);
                let str = temp.charAt(0).toUpperCase() + temp.slice(1);
                dispatch(setUser_AddUser({ position: str }));
              }}
            />

            <FormItemError
              status={validation?.position.status}
              message={validation?.position.message}
            />
          </FormItemModal>

          <FormItemModal>
            <Dropdown
              id="addUserModal_role"
              title="Роль"
              placeholder="Выберите роль"
              multiple={false}
              changeValue={(value) => {
                dispatch(setRoleAddUser(value));
              }}
              reset={reset}
              setReset={() => dispatch(setResetAddUser({ reset: false }))}
              options={roles}
              validation={validation?.role.status}
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
