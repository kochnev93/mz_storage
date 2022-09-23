import cx from 'classnames';
import React, {useState, useCallback, useEffect} from 'react';
import styles from './Advt.module.scss';
import { AiOutlineClose } from 'react-icons/Ai';



function Advt() {
const [state, setState] = useState({
    active: false,
    error: false,
    errorMessage: ''
});

useEffect(() => {
    ping();
}, []);

const ping = useCallback(() => {
    fetch(`http://localhost:3001`)
    .then(res => res.ok ? res : Promise.reject(res))
    .then(data => {
        setState({
            active: false,
            error: false,
            errorMessage: ''
        });
    })
    .catch((err) => {
        setState({
            active: true,
            error: true,
            errorMessage: `Нет соединения с сервером. ${err}`
        });
    });
}, [state.error])


setInterval(ping(), 5000);

  return (
    <div className={cx(styles.advt_popup, {[styles.active]: state.active})}>
        <div className={styles.advt_text}>
            {state.errorMessage}
        </div>
        <AiOutlineClose onClick={() => {setState({active: false})}}/>
    </div>
  );
}

export default Advt;
