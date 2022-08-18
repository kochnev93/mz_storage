import React from 'react';
import cx from 'classnames';
import styles from './Buttons.module.scss';

const MyButton = (props) => {
    return(
        <button 
            className={cx(styles.btn, {
                [styles.send]: props.type === "send",
                [styles.clear]: props.type === "clear"
            })}     
            onClick={props.action}>
            {props.title}
        </button>
    );
}

export default MyButton;