import React from "react";
import { useAuth } from "../../../hooks/use-auth";
import loading from "./loading_message.gif";
import cx from "classnames";

//Styles
import styles from "./ListMessage.module.scss";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { cancelLoadingComment } from "../../../features/modal/about-productSlice";


export const LoadingMessage = () => {
  const user = useAuth();
  const dispatch = useDispatch();

  // Redux
  const { ErrorLoadingNewComment, RepeatLoadingNewComment, inputComment, loadingNewComent } = useSelector(
    (state) => state.modal_about_product
  );

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
        <div
          className={cx(styles.messages_text, {
            [styles.error]: ErrorLoadingNewComment,
          })}
        >
          {ErrorLoadingNewComment ? inputComment : (
          <img
            className={styles.loading_message}
            src={loading}
            alt="Загрузка..."
          />)}
        </div>
        <div className={styles.messages_error}>
          {ErrorLoadingNewComment && (
            <>
              <span>Комментарий не был отправлен</span>
              <span className={styles.repeat} onClick={()=>{RepeatLoadingNewComment()}}>Повторить</span>
              <span className={styles.cancel} onClick={() => {dispatch(cancelLoadingComment())}}>Отменить</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
