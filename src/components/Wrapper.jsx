import React from 'react';
import styles from '../style/styles.module.scss';

export default function WrapperApp(props){
    return <div className={styles.container}>{props.children}</div>
}