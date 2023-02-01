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
  const product_id = useSelector(
    (state) => state.modal_about_product.product_id
  );

  //State
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: 'Антон',
      date: '28.09.2022',
      text: 'Это тестовый комментарий',
    },
  ]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (product_id !== null) {
      getComments(product_id);
    }
  }, [product_id]);

  const getComments = async (product_id) => {
    let requestOptions = {
      method: 'GET',
    };

    const comments = await fetchNow(
      `http://localhost:3001/api/get_comments/${product_id}`,
      requestOptions
    );

    if (comments.data) {
      setMessages(comments.data);
    }
  };

  const addComment = async () => {

    console.log(`Message: ${comment} - is sending`);

    let data = JSON.stringify({
      product_id: product_id,
      comment: comment,
    });

    let requestOptions = {
      method: 'POST',
      body: data,
    };

    const sendingComment = await fetchNow(
      `http://localhost:3001/api/add_comment`,
      requestOptions
    );

    if (sendingComment.data) {
      getComments(product_id);
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
