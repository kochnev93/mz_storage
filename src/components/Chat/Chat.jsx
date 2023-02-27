import React, { useState, useEffect } from 'react';

//Styles
import styles from './Chat.module.scss';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addNewComment, setComments, setInputComment, setLoadingNewComment } from '../../features/modal/about-productSlice';

//Components
import { ListMessage } from './ListMessage/ListMessage.jsx';
import { SendMessage } from './SendMessage/SendMessage.jsx';

//Hooks
import useFetch from '../../hooks/useFetch';

export const Chat = (props) => {
  const { fetchNow } = useFetch();
  const dispatch = useDispatch();

  // Redux
  const {messages, inputComment, product, comments, loadingNewComent} = useSelector(
    (state) => state.modal_about_product
  );

  useEffect(() => {
    if (product?.id) {
      getComments();
    }
  }, [product?.id, product?.id_warehouse]);

  const getComments = async () => {
    let requestOptions = {
      method: 'GET',
    };

    const comments = await fetchNow(
      `${process.env.REACT_APP_API_SERVER}/get_comments/${product?.id}`,
      requestOptions
    );

    if (comments.data) {
      console.log('COMMENTS', comments);
      dispatch(setComments({comments: comments.data}));
      dispatch(setInputComment({inputComment: ''}));
    }
  };

  const addComment = async () => {
   dispatch(setLoadingNewComment({loading: true}))

    let data = JSON.stringify({
      product_id: product?.id,
      comment: inputComment,
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
      dispatch(addNewComment({comment: sendingComment.data}))
      dispatch(setInputComment({inputComment: ''}));
    } else {
      console.warn('Комментарий не был отправлен: ', sendingComment.error)
    }
  };

  return (
    <div className={styles.chat}>
      <SendMessage
        onClick={addComment}
        onChange={(value) => {dispatch(setInputComment({inputComment: value}))}}
        value={inputComment}
      />
      <ListMessage messages={comments} loadingNewComent={loadingNewComent} />
    </div>
  );
};
