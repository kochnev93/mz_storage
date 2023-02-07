import React, { useState, useEffect } from 'react';

//Styles
import styles from './Chat.module.scss';

//Redux
import { useDispatch, useSelector } from 'react-redux';

//Components
import { ListMessage } from './ListMessage/ListMessage.jsx';
import { SendMessage } from './SendMessage/SendMessage.jsx';

//Hooks
import useFetch from '../../hooks/useFetch';

export const Chat = (props) => {
  const { fetchNow } = useFetch();

  // Redux
  const product = useSelector(
    (state) => state.modal_about_product.product
  );

  //State
  const [messages, setMessages] = useState([]);
  const [comment, setComment] = useState('');

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
      setMessages(comments.data);
    }
  };

  const addComment = async () => {

    console.log(`Message: ${comment} - is sending`);

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
      setComment('')
    }
  };

  return (
    <div className={styles.chat}>
      <SendMessage
        onClick={addComment}
        onChange={setComment}
        value={comment}
      />
      <ListMessage messages={messages} />
    </div>
  );
};
