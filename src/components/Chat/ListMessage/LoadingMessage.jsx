import React from 'react';
import { useAuth } from '../../../hooks/use-auth';
import loading from './loading_message.gif'

//Styles
import styles from './ListMessage.module.scss';

export const LoadingMessage = () => {
  const user = useAuth();

  return (
    <div className={styles.messages_item}>
      <div className={styles.messages_img}>
        <img
          src={`${process.env.REACT_APP_SERVER}/images/${user?.img}`}
          alt=""
        />
      </div>
      <div className={styles.messages_content}>
        <div className={styles.messages_author}>{user?.login}</div>
        <div className={styles.messages_text}>
            <img className={styles.loading_message} src={loading} alt="Загрузка..." />
        </div>
      </div>
    </div>
  );
};
