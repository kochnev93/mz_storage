import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
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
} from "../../../../features/modal/add-userSlice.js";
import { addNewUser } from "../../../../features/admin/adminUsersSlice.js";

// Hooks
import {
  validationAddUsertForm,
  validationNameAddUser,
  validationSurnameAddUser,
  validationEmailAddUser,
  validationPhoneAddUser,
  validationLoginAddUser,
  validationPositionAddUser,
} from "./validationAddUser.js";
import { useTranslit } from "../../../../hooks/useTranslit.js";
import useFetch from "../../../../hooks/useFetch.js";

// Components
import Modal from "../MyModal2.jsx";
import MyInput from "../../Input/MyInput.jsx";
import { FormItemError } from "../FormItemModal/FormItemError.jsx";
import { FormItemModal } from "../FormItemModal/FormItemModal.jsx";
import { FormModal } from "../FormModal/FormModal.jsx";
import Dropdown from "../../Dropdown/MyDropdown-function.jsx";

function ModalAddUser() {
  const dispatch = useDispatch();

  const { active, message, errors, isLoading, reset, user, validation } =
    useSelector((state) => state.modal_add_user);

  const { roles } = useSelector((state) => state.app_state);

  const { fetchNow } = useFetch();

  const validationForm = (obj) => {
    //dispatch(setDefaultValidationAddUser());

    // const values = { ...user };
    const tempValidation = JSON.parse(JSON.stringify(validation));
    let validateError;

    switch (obj.inputName) {
      case "name":
        validateError = validationNameAddUser(tempValidation, obj.inputValue);
        break;
      case "surname":
        validateError = validationSurnameAddUser(
          tempValidation,
          obj.inputValue
        );
        break;
      case "email":
        validateError = validationEmailAddUser(tempValidation, obj.inputValue);
        break;
      case "phone":
        validateError = validationPhoneAddUser(tempValidation, obj.inputValue);
        break;
      case "login":
        validateError = validationLoginAddUser(tempValidation, obj.inputValue);
        break;
      case "position":
        validateError = validationPositionAddUser(
          tempValidation,
          obj.inputValue
        );
        break;
    }

    console.log("validateError", validateError);

    //const validateError = validationAddUsertForm(tempValidation, values);

    if (validateError == 0) {
      dispatch(setValidationAddUser({ ...tempValidation }));
      dispatch(
        setMessageAddUser({
          errors: false,
          message: ``,
        })
      );
      return true;
    } else {
      dispatch(setValidationAddUser({ ...tempValidation }));
      dispatch(
        setMessageAddUser({
          errors: true,
          message: `Количество ошибок: ${validateError}`,
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
        user: user,
      });

      let requestOptions = {
        method: "POST",
        body: data,
      };

      const result = await fetchNow(
        `${process.env.REACT_APP_API_SERVER}/register`,
        requestOptions
      );

      if (result.data) {
        console.log("res", result);
        dispatch(setMessageAddUser({ message: result.data }));
        dispatch(addNewUser(result.user));
      } else {
        console.warn(result.error);
        dispatch(setMessageAddUser({ errors: true, message: result.error }));
      }

      setTimeout(() => {
        dispatch(setIsLoadingAddUser({ isLoading: false }));
      }, 200);
    } else {
      console.warn("USer not add");
    }
  };

  const resetForm = () => {
    dispatch(setDefaultAddUser());
  };

  const delSpaseStr = (str) => {
    return str.replace(/\s+/g, " ").trim();
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
                validationForm({ inputName: "name", inputValue: value });
              }}
              validation={validation?.name.status}
              value={user.name}
              onBlur={() => {
                let temp = delSpaseStr(user.name);
                let str = temp.charAt(0).toUpperCase() + temp.slice(1);
                dispatch(setUser_AddUser({ name: str }));
                validationForm({ inputName: "name", inputValue: str });
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
                validationForm({ inputName: "surname", inputValue: value });
              }}
              onBlur={() => {
                let temp = delSpaseStr(user.surname);
                let str = temp.charAt(0).toUpperCase() + temp.slice(1);
                dispatch(setUser_AddUser({ surname: str }));
                validationForm({ inputName: "surname", inputValue: str });

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
                validationForm({ inputName: "email", inputValue: value });
              }}
              onBlur={() => {
                let str = delSpaseStr(user.email);
                dispatch(setUser_AddUser({ email: str }));
                validationForm({ inputName: "email", inputValue: str });
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
                validationForm({ inputName: "phone", inputValue: value });
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
                validationForm({ inputName: "login", inputValue: value });
              }}
              validation={validation?.login.status}
              value={user.login}
              onBlur={() => {
                let temp = delSpaseStr(user.login);
                dispatch(setUser_AddUser({ login: temp.toLowerCase() }));
                validationForm({ inputName: "login", inputValue: temp });
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
              title="Должность"
              disabled={false}
              changeValue={(value) => {
                dispatch(setUser_AddUser({ position: value }));
                validationForm({ inputName: "position", inputValue: value });
              }}
              validation={validation?.position.status}
              value={user.position}
              onBlur={() => {
                let temp = delSpaseStr(user.position);
                let str = temp.charAt(0).toUpperCase() + temp.slice(1);
                dispatch(setUser_AddUser({ position: str }));
                validationForm({ inputName: "position", inputValue: str });
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
          <hr />
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
        </FormModal>
      </>
    </Modal>
  );
}

export default ModalAddUser;
