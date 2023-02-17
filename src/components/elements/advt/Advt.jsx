import React, {useState, useEffect} from 'react';
import cx from 'classnames';
import styles from './Advt.module.scss';
import { AiOutlineClose } from 'react-icons/Ai';


// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../../../features/app/appSlice.js';



function Advt() {
const dispatch = useDispatch();
const [active, setActive] = useState(false);
const statusApp = useSelector((state) => state.appStatus);

useEffect(() => {
    ping();
}, []);

useEffect(() => {
    const interval = setInterval(() => {ping()}, 30000);
    return () => clearInterval(interval);
}, []);

const ping = () => {
    fetch(`${process.env.REACT_APP_API_SERVER}/test`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
        dispatch(setStatus({ status: true, error: null }));
        setActive(false);
    })
    .catch((err) => {
        console.log('123', err, err.message)
        dispatch(setStatus({ status: false, error: 'Нет соединения с сервером', description: err.message }));
        setActive(true);
    });
}

  return (
    <div className={cx(styles.advt_popup, {[styles.active]: active})}>
        <div className={styles.advt_text}>
            {statusApp.error}
        </div>
        <AiOutlineClose onClick={() => {setActive(false)}}/>
    </div>
  );
}

export default Advt;
