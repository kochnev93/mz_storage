import React, {useState, useEffect} from 'react';
import cx from 'classnames';
import styles from './Advt.module.scss';
import { AiOutlineClose } from 'react-icons/Ai';



function Advt() {
const [active, setActive] = useState(false);
const [errorMessage, seterrorMessage] = useState('');


useEffect(() => {
    const interval = setInterval(() => {ping()}, 30000);
    return () => clearInterval(interval);
}, []);

const ping = () => {
    fetch(`http://localhost:3001/api/test`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
        setActive(false);
        seterrorMessage('');
    })
    .catch((err) => {
        setActive(true);
        seterrorMessage(`Нет соединения с сервером. ${err}`);
    });
}

  return (
    <div className={cx(styles.advt_popup, {[styles.active]: active})}>
        <div className={styles.advt_text}>
            {errorMessage}
        </div>
        <AiOutlineClose onClick={() => {setActive(false)}}/>
    </div>
  );
}

export default Advt;
