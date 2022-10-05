import React, {useState} from 'react';


//Styles
import styles from './Chat.module.scss';


//Components
import { ListMessage } from './ListMessage/ListMessage.jsx';
import { SendMessage } from './SendMessage/SendMessage.jsx';


export const Chat = (props) => {
    const [messages, setMessages]= useState([
        {
            id: 1,
            author: 'Антон',
            date: '28.09.2022',
            text: 'Это тестовый комментарий'
        },
    ]);
    const [comment, setComment] = useState('');

    const sendComment = () => {
        console.log(`Message: ${comment} - is sending`);
        setComment('');

        const newMessage = {
            id: 2,
            author: 'Сергей',
            date: '30.09.2022',
            text: comment
        };

        const newState = [
            ...messages,
            newMessage
        ];

        setMessages( newState );
    }

    return(
        <div className={styles.chat}>
            <SendMessage onClick={sendComment} onChange={setComment} value={comment}/>
            <ListMessage messages = {messages}/>
            
        </div>
    );
}