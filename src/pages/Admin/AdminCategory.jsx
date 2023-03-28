import React, { useState, useMemo, useEffect } from 'react';

import cx from 'classnames';
import styles from '../style.module.scss';
import { AiOutlineInfoCircle } from 'react-icons/Ai';

import MyButton from '../../components/ui/Buttons/ButtonSend.jsx';
import { MyTable } from '../../components/elements/Table/MyTable.jsx';

// Redux
import { useDispatch, useSelector } from 'react-redux';


export const AdminCategory = () => {
  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.app_state);

  const [titleColumn] = useState([
    'ID',
    'Наименование',
  ]);

  const bodyContent = useMemo(() => {
    if (category.length) {
      return category.map((item) => {
        return (
          <tr key={item?.id}>
            <td>{item?.id}</td>
            <td style={{textAlign: 'left'}}>{item?.title}</td>
          </tr>
        );
      }).sort((a,b) => b.id-a.id);
    }
  }, [category]);

  return (
    <section>
      <div className={styles.header}>
        <span className={cx(styles.info_message)}>

        </span>

        <MyButton
          type="send"
          title="Добавить категорию"
        //   action={() => {
        //     dispatch(setActiveAddUser({active: true}));
        //   }}
        />
      </div>

      <MyTable
        titleColumn={titleColumn}
        content={bodyContent}
        resultCount={category.length}
      />
    </section>
  );
};
