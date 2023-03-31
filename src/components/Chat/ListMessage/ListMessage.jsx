import React from 'react';
import { useAuth } from '../../../hooks/use-auth';

//Styles
import styles from './ListMessage.module.scss';
import { LoadingMessage } from './LoadingMessage.jsx';

//Redux
import { useSelector } from 'react-redux';

export const ListMessage = (props) => {
  const user = useAuth();

   const {loadingNewComent, ErrorLoadingNewComment} = useSelector(
    (state) => state.modal_about_product
  );


  const listMessage = props.messages?.map((item) => {
    return (
      <li className={styles.messages_item} key={item.id_comment}>
        <div className={styles.messages_img}>
          <img
            src={`${process.env.REACT_APP_SERVER}/images/${user?.img}`}
            alt=""
          />
        </div>
        <div className={styles.messages_content}>
          <div className={styles.messages_author}>{item.author}</div>
          <div className={styles.messages_text}>{item.comment}</div>
          <div className={styles.messages_date}>
            {new Date(item.date).toLocaleString()}
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className={styles.messages}>
      <div className={styles.messages_count}>
        Всего комментариев: {props.messages?.length}
      </div>
      <ul className={styles.messages_list}>
        {listMessage}
      </ul>

      {
        loadingNewComent || ErrorLoadingNewComment ? (
            <LoadingMessage/>
        ) : null
      }
    </div>
  );
};
