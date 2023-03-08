import React, { useMemo } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveAboutUser,
  setDefaultAboutUser,
  setErrorsAboutUser,
  setMessageAboutUser,
  setResetAboutUser,
  setIsLoadingAboutUser,
  setEditAboutUser,
  cancelChangesAboutUser,
  setValidationAboutUser,
} from '../../../../features/modal/about-userSlice.js';

// Components
import Modal from '../MyModal2.jsx';
import MyInput from '../../Input/MyInput.jsx';
import { FormItemModal } from '../FormItemModal/FormItemModal.jsx';
import { FormItemError } from '../FormItemModal/FormItemError.jsx';
import { FormModal } from '../FormModal/FormModal.jsx';
import Dropdown from '../../Dropdown/MyDropdown-function.jsx';

// Service
import {
  validationNameUser,
  validationSurnameUser,
  validationEmailUser,
  validationPhoneUser,
  validationLoginUser,
  validationPositionUser,
} from '../../../../services/validation/validationUserFields.js';

import styles from './MyModal-aboutUser.module.scss';

function ModalAboutUser() {
  const dispatch = useDispatch();

  const {
    active,
    user,
    editUser,
    validation,
    errors,
    message,
    reset,
    isEdit,
    isLoading,
  } = useSelector((state) => state.modal_about_user);

  const { roles } = useSelector((state) => state.app_state);

  const currentRoles = roles.map((item) => {
    if (item.title == user.role){
      return {...item, isCheked: true};
    }

    return {...item};
  });

  const validationForm = (obj) => {
    //const values = { ...user };
    const tempValidation = JSON.parse(JSON.stringify(validation));
    let validateError;

    switch (obj?.inputName) {
      case 'name':
        validateError = validationNameUser(tempValidation, obj.inputValue);
        break;

      case 'surname':
        validateError = validationSurnameUser(tempValidation, obj.inputValue);
        break;

      case 'login':
        validateError = validationLoginUser(tempValidation, obj.inputValue);
        break;

      case 'phone':
        validateError = validationPhoneUser(tempValidation, obj.inputValue);
        break;

      case 'email':
        validateError = validationEmailUser(tempValidation, obj.inputValue);
        break;

      case 'position':
        validateError = validationPositionUser(tempValidation, obj.inputValue);
        break;
    }

    if (validateError == 0) {
      dispatch(setValidationAboutUser({ ...tempValidation }));
      dispatch(
        setMessageAboutUser({
          errors: false,
          message: ``,
        })
      );
      return true;
    } else {
      dispatch(setValidationAboutUser({ ...tempValidation }));
      dispatch(
        setMessageAboutUser({
          errors: true,
          message: `В документе присутствуют ошибки`,
        })
      );
      return false;
    }
  };

  const saveUser = () => {
    console.log('save');
  };

  const resetUser = () => {
    dispatch(cancelChangesAboutUser());
  };

  const delSpaseStr = (str) => {
    return str.replace(/\s+/g, ' ').trim();
  };

  return (
    <Modal
      active={active}
      size={'big'}
      setActive={() => {
        dispatch(setActiveAboutUser({ active: false }));
        dispatch(setDefaultAboutUser());
      }}
      title="Информация о пользователе"
      message={message}
      errors={errors}
      isLoading={isLoading}
      footer={'Внесите изменения и нажмите Сохранить'}
      actions={{
        visible: true,
        buttonSend: {
          action: saveUser,
          title: 'Сохранить',
          loadingTitle: 'Сохраняю',
          loading: isLoading,
          disabled: !isEdit || errors,
        },
        buttonClear: {
          action: resetUser,
          title: 'Отменить изменения',
          loadingTitle: 'Отменить',
          loading: isLoading,
        },
      }}
    >
      <>
        {Boolean(user?.isBlocked) && (
          <div className={styles.blocked_msg}>
            <div>
              <strong>Пользователь заблокирован</strong>
            </div>

            <div className={styles.unlock_btn}>
              <button>Разблокировать</button>
            </div>
          </div>
        )}

        <div className={styles.user}>
          <div className={styles.user__info}>
            <div className={styles.user__img}>
              <img
                src={
                  user?.img
                    ? `${process.env.REACT_APP_SERVER}/images/${user?.img}`
                    : 'https://iglit.ru/dist/no-image.jpg'
                }
                alt="Аватар пользователя"
              />
            </div>

            <ul>
              <li>
                Создан: <span>12.12.2020 г.</span>
              </li>
              <li>
                Последняя активность: <span>12.12.2020 г.</span>
              </li>
            </ul>

            {!user?.isBlocked && (
              <button className={styles.block_btn}>Заблокировать</button>
            )}
          </div>

          <FormModal columns={2}>
            <FormItemModal>
              <MyInput
                type="text"
                title="ID"
                disabled={true}
                validation={true}
                value={user?.id}
              />
            </FormItemModal>

            <FormItemModal>
              <MyInput
                type="text"
                title="Логин"
                changeValue={(value) => {
                  dispatch(setEditAboutUser({ login: value }));
                  validationForm({ inputName: 'login', inputValue: value });
                }}
                validation={validation?.login.status}
                value={editUser?.login}
                onBlur={() => {
                  let temp = delSpaseStr(editUser?.login);
                  dispatch(setEditAboutUser({ login: temp.toLowerCase() }));
                  validationForm({ inputName: 'login', inputValue: temp });
                }}
              />

              <FormItemError
                status={validation?.login.status}
                message={validation?.login.message}
              />
            </FormItemModal>

            <FormItemModal>
              <MyInput
                type="text"
                title="Фамилия"
                changeValue={(value) => {
                  dispatch(setEditAboutUser({ surname: value }));
                  validationForm({ inputName: 'surname', inputValue: value });
                }}
                validation={validation?.surname.status}
                value={editUser?.surname}
                onBlur={() => {
                  let temp = delSpaseStr(editUser.surname);
                  let str =
                    temp.charAt(0).toUpperCase() + temp.slice(1).toLowerCase();
                  dispatch(setEditAboutUser({ surname: str }));
                  validationForm({ inputName: 'surname', inputValue: str });
                }}
              />

              <FormItemError
                status={validation?.surname.status}
                message={validation?.surname.message}
              />
            </FormItemModal>

            <FormItemModal>
              <MyInput
                type="text"
                title="Имя"
                changeValue={(value) => {
                  dispatch(setEditAboutUser({ name: value }));
                  validationForm({ inputName: 'name', inputValue: value });
                }}
                validation={validation?.name.status}
                value={editUser?.name}
                onBlur={() => {
                  let temp = delSpaseStr(editUser.name);
                  let str =
                    temp.charAt(0).toUpperCase() + temp.slice(1).toLowerCase();
                  dispatch(setEditAboutUser({ name: str }));
                  validationForm({ inputName: 'name', inputValue: str });
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
                title="E-mail"
                changeValue={(value) => {
                  dispatch(setEditAboutUser({ email: value }));
                  validationForm({ inputName: 'email', inputValue: value });
                }}
                validation={validation?.email.status}
                value={editUser?.email}
                onBlur={() => {
                  let str = delSpaseStr(editUser?.email);
                  dispatch(setEditAboutUser({ email: str }));
                  validationForm({ inputName: 'email', inputValue: str });
                }}
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
                  dispatch(setEditAboutUser({ phone: value }));
                  validationForm({ inputName: 'phone', inputValue: value });
                }}
                validation={validation?.phone.status}
                value={editUser?.phone}
              />

              <FormItemError
                status={validation?.phone.status}
                message={validation?.phone.message}
              />
            </FormItemModal>

            <FormItemModal>
              <MyInput
                type="text"
                title="Должность"
                changeValue={(value) => {
                  dispatch(setEditAboutUser({ position: value }));
                  validationForm({ inputName: 'position', inputValue: value });
                }}
                validation={validation?.position.status}
                value={editUser?.position}
                onBlur={() => {
                  let temp = delSpaseStr(editUser?.position);
                  let str =
                    temp.charAt(0).toUpperCase() + temp.slice(1).toLowerCase();
                  dispatch(setEditAboutUser({ position: str }));
                  validationForm({ inputName: 'position', inputValue: str });
                }}
              />

              <FormItemError
                status={validation?.position.status}
                message={validation?.position.message}
              />
            </FormItemModal>

            <FormItemModal>
              <Dropdown
                id="aboutUserModal_role"
                title="Роль"
                placeholder="Выберите роль"
                multiple={false}
                changeValue={(value) => {
                  dispatch(setEditAboutUser(value));
                }}
                reset={reset}
                setReset={() => dispatch(setResetAboutUser({ reset: false }))}
                options={currentRoles}
                validation={validation?.role.status}
              />

              <FormItemError
                status={validation?.role.status}
                message={validation?.role.message}
              />

            </FormItemModal>
          </FormModal>
        </div>
      </>
    </Modal>
  );
}

export default ModalAboutUser;
