import React from 'react';


//Styles
import styles from './ListMessage.module.scss';

export const ListMessage = (props) => {

    const listMessage = props.messages.map((item) => {
        return(
            <li className={styles.messages_item} key={item.id_comment}>
                <div className={styles.messages_author}>
                    {item.author}
                </div>
                <div className={styles.messages_text}>
                    {item.comment}
                </div>
                <div className={styles.messages_date}>
                    {new Date(item.date).toLocaleString()}
                </div>
            </li>
        );
    });
    
    return(
        <div className={styles.messages}>
            <div className={styles.messages_count}>Всего комментариев: {props.messages.length}</div>
            <ul className={styles.messages_list}>
                {listMessage}
            </ul>
        </div>
    );
}