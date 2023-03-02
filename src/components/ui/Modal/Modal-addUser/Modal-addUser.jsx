import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setActiveAddUser } from "../../../../features/modal/add-userSlice.js";
import MyInput from "../../Input/MyInput.jsx";
import { FormItemModal } from "../FormItemModal/FormItemModal.jsx";
import { FormModal } from "../FormModal/FormModal.jsx";

// Components
import Modal from "../MyModal2.jsx";

function ModalAddUser() {
  const dispatch = useDispatch();
  const {active, message, errors, isLoading, reset} = useSelector((state) => state.modal_add_user)


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
    >
      <>

          <FormModal columns={1}>
            <FormItemModal>
              <MyInput
                type="text"
                title="ID"
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
