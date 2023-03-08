import React from 'react';
import cx from 'classnames';
import styles from './Buttons.module.scss';
import {loading} from './loading.gif';

const MyButton = (props) => {
    return(
        <button 
            className={cx(styles.btn, {
                [styles.send]: props.type === "send",
                [styles.clear]: props.type === "clear",
                [styles.loading]: props.loading
            })}     
            onClick={props.action}
            disabled={props.disabled}
        >
            {props.loading ? props.loadingTitle : props.title}
        </button>
    );
}

export default MyButton;