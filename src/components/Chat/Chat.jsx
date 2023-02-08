import React, { useState, useEffect } from 'react';

//Styles
import styles from './Chat.module.scss';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addComment, setComments, setInputComment } from '../../features/modal/about-productSlice';

//Components
import { ListMessage } from './ListMessage/ListMessage.jsx';
import { SendMessage } from './SendMessage/SendMessage.jsx';

//Hooks
import useFetch from '../../hooks/useFetch';

export const Chat = (props) => {
  const { fetchNow } = useFetch();
  const dispatch = useDispatch();

  // Redux
  const messages = useSelector(
    (state) => state.modal_about_product.comments
  );
  const comment = useSelector(
    (state) => state.modal_about_product.inputComment
  );
  const product = useSelector(
    (state) => state.modal_about_product.product
  );

  useEffect(() => {
    if (product?.id !== null) {
      getComments();
    }
  }, [product?.id]);

  const getComments = async () => {
    let requestOptions = {
      method: 'GET',
    };

    const comments = await fetchNow(
      `${process.env.REACT_APP_API_SERVER}/get_comments/${product?.id}`,
      requestOptions
    );

    if (comments.data) {
      dispatch(setComments({comments: comments.data}));
      dispatch(setInputComment({inputComment: null}));
    }
  };

  const addComment = async () => {

    console.log('Message sending---', comment)

    let data = JSON.stringify({
      product_id: product?.id,
      comment: comment,
    });

    let requestOptions = {
      method: 'POST',
      body: data,
    };

    const sendingComment = await fetchNow(
      `${process.env.REACT_APP_API_SERVER}/add_comment`,
      requestOptions
    );

    if (sendingComment.data) {
      getComments();
      dispatch(setInputComment({inputComment: null}));
    } else {
      console.warn('Кооментарий не был отправлен: ', comment)
    }
  };

  return (
    <div className={styles.chat}>
      <SendMessage
        onClick={addComment}
        onChange={(value) => {dispatch(setInputComment({inputComment: value}))}}
        value={comment}
      />
      <ListMessage messages={messages} />
    </div>
  );
};
