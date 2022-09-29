import React from 'react';


//Styles
import styles from './ListMessage.module.scss';

export const ListMessage = (props) => {

    const listMessage = props.messages.map((item, index) => {
        return(
            <li className={styles.messages_item}>
                <div className={styles.messages_author}>
                    {item.author}
                </div>
                <div className={styles.messages_text}>
                    {item.text}
                </div>
                <div className={styles.messages_date}>
                    {item.date}
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