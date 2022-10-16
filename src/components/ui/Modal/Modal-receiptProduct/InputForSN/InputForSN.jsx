import React from 'react';
import cx from 'classnames';
import styles from './InputForSN.module.scss';

import { IoMdAddCircle } from 'react-icons/Io';
import SelectedItem from '../../../other/SelectedItem/SelectedItem.jsx';

const InputForSN = (props) => {
  let listSN = props.sn.map((item, index) => {
    return (
      <SelectedItem key={index} title={item} onClick={props.deleteSN} />
    );
  });

  return (
    <>
      <div className={styles.myInputSN}>
        <input
          className={styles.myInputSN_input}
          type={props.type}
          placeholder=" "
          onChange={(e) => {
            props.changeValue(e.target.value);
          }}
          value={props.value}
          disabled={props.disabled || false}
        />
        <label className={styles.myInputSN_label}>
          {props.title || 'Заголовок'}
        </label>
        <fieldset
          className={cx(styles.myInputSN_fieldset, {
            [styles.error]: !props.validation.status,
          })}
        >
          <legend>
            <span>{props.title || 'Заголовок'}</span>
          </legend>
        </fieldset>

        <button
          className={styles.myInputSN_button}
          disabled={props.value.length ? false : true}
          onClick={(e) => props.addSN(e)}
        >
          <IoMdAddCircle />
        </button>
      </div>

      <div>
        <span className={styles.warning}>{props.validation.message}</span>
        <ul className={styles.selectedItem_menu}>{listSN}</ul>
      </div>
    </>
  );
};

export default InputForSN;
