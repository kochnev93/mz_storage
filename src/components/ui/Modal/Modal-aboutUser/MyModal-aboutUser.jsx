import React, { useMemo } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchBlockUser, setActiveAboutUser, unBlockUser, blockUser } from "../../../../features/admin/adminUsersSlice.js";
import MyInput from "../../Input/MyInput.jsx";
import { FormItemModal } from "../FormItemModal/FormItemModal.jsx";
import { FormModal } from "../FormModal/FormModal.jsx";

// Components
import Modal from "../MyModal2.jsx";

import styles from "./MyModal-aboutUser.module.scss";

function ModalAboutUser() {
  const dispatch = useDispatch();

  const { active, id_user, users, errors, message, reset, isLoading } =
    useSelector((state) => state.modal_about_user);

  const currentUser = useMemo(() => {
    return users.filter((item) => item.id === id_user);
  }, [id_user, users]);

  const unlockUser = () => {
    let answer = confirm(`Разблокировать пользователя ${currentUser[0]?.mz_user_login}?`)

    if(answer){
      dispatch(unBlockUser({id: currentUser[0]?.id}))
    }

    return answer ? console.log('unlock') : console.log('no unlock')
  }


  const lockUser = () => {
    let answer = confirm(`Заблокировать пользователя ${currentUser[0]?.mz_user_login}?`)

    if(answer){
      dispatch(blockUser({id: currentUser[0]?.id}))
      //dispatch(fetchBlockUser())
    }

    return answer ? console.log('unlock') : console.log('no unlock')
  }

  return (
    <Modal
      active={active}
      size={"big"}
      setActive={() => {
        dispatch(setActiveAboutUser({ active: false }));
      }}
      title="Информация о пользователе"
      message={message}
      errors={errors}
      isLoading={isLoading}
      footer={"Внесите изменения и нажмите сохранить"}
    >
      <>
        {currentUser[0]?.isBlocked && (
          <div className={styles.blocked_msg}>
            <div>
              <strong>Пользователь заблокирован</strong>
            </div>

            <div className={styles.unlock_btn}>
              <button onClick={unlockUser}>Разблокировать</button>
            </div>
          </div>
        )}

        <div className={styles.user}>
          <div className={styles.user__info}>
            <div className={styles.user__img}>
              <img
                src="https://cojo.ru/wp-content/uploads/2023/01/muzhskoi-siluet-8.webp"
                alt=""
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

            {
              !currentUser[0]?.isBlocked && (
                <button className={styles.block_btn} onClick={lockUser}>Заблокировать</button>
              )
            }
          </div>

          <FormModal columns={1}>
            <FormItemModal>
              <MyInput
                type="text"
                title="ID"
                disabled={true}
                //changeValue={setProduct}
                validation={true}
                value={currentUser[0]?.id}
              />
            </FormItemModal>

            <FormItemModal>
              <MyInput
                type="text"
                title="Логин"
                changeValue={() => {}}
                validation={true}
                value={currentUser[0]?.mz_user_login}
              />
            </FormItemModal>

            <FormItemModal>
              <MyInput
                type="text"
                title="Фамилия"
                changeValue={() => {}}
                validation={true}
                value={''}
              />
            </FormItemModal>

            <FormItemModal>
              <MyInput
                type="text"
                title="Имя"
                changeValue={() => {}}
                validation={true}
                value={''}
              />
            </FormItemModal>

            <FormItemModal>
              <MyInput
                type="text"
                title="E-mail"
                changeValue={() => {}}
                validation={true}
                value={''}
              />
            </FormItemModal>

          </FormModal>
        </div>

        {/* <FormModal columns={4}>
          <FormItemModal>
            <MyInput
              type="text"
              title="ID"
              disabled={true}
              //changeValue={setProduct}
              validation={true}
              value={currentUser[0]?.id}
            />
          </FormItemModal>

          <FormItemModal>
            <MyInput
              type="text"
              title="ID"
              disabled={true}
              //changeValue={setProduct}
              validation={true}
              value={currentUser[0]?.id}
            />
          </FormItemModal>
          <FormItemModal>
            <MyInput
              type="text"
              title="ID"
              disabled={true}
              //changeValue={setProduct}
              validation={true}
              value={currentUser[0]?.id}
            />
          </FormItemModal>
          <FormItemModal>
            <MyInput
              type="text"
              title="ID"
              disabled={true}
              //changeValue={setProduct}
              validation={true}
              value={currentUser[0]?.id}
            />
          </FormItemModal>
        </FormModal> */}
      </>
    </Modal>
  );
}

export default ModalAboutUser;
