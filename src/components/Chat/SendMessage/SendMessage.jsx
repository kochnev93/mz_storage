import React from 'react';
import cx from 'classnames';

//Styles
import styles from './SendMessage.module.scss';

export const SendMessage = ({onChange, onClick, value}) => {

    return(
        <div className={styles.sendMessage}>
            <textarea 
                value={value} 
                onChange={(e) => onChange(e.target.value)} 
                placeholder={'Напишите комментарий'}
            >
            </textarea>

            <button 
                className={ cx(styles.sendMessage_button,{[styles.active]: !!value}) } 
                onClick={ () => {onClick()} }
            >
                Отправить
            </button>
        </div>
    );
}