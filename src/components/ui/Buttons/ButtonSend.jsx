import React from 'react';
import cx from 'classnames';
import styles from './Buttons.module.scss';

const ButtonSend = (props) => {
    return(
        <button className={ cx(styles.btn, {[styles.send]: true}) } onClick={props.send}>
            {props.title}
        </button>
    );
}

export default ButtonSend;