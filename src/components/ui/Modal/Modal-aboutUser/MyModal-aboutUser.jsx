import React, { useMemo } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setActiveAboutUser } from '../../../../features/admin/adminUsersSlice.js';

// Components
import Modal from '../MyModal2.jsx';

function ModalAboutUser() {
  const dispatch = useDispatch();

  const { active, id_user, users, errors, message, reset, isLoading } =
    useSelector((state) => state.modal_about_user);

  const currentUser = useMemo(() => {
    return users.filter((item) => item.id === id_user);
  }, [id_user]);

  return (
    <Modal
      active={active}
      setActive={() => {
        dispatch(setActiveAboutUser({ active: false }));
      }}
      title="Информация о пользователе"
      message={message}
      errors={errors}
      isLoading={isLoading}
      footer={'Внесите изменения и нажмите сохранить'}
    >
      {JSON.stringify(currentUser)}
    </Modal>
  );
}

export default ModalAboutUser;
