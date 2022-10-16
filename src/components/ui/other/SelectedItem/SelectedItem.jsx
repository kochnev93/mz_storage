import React from 'react';
import styles from './SelectedItem.module.scss';

import { AiOutlineClose } from 'react-icons/Ai';

const SelectedItem = (props) => {
  return (
    <li key={props.key}>
      <div className={styles.selectedItem_title}>{props.title}</div>
      <div
        className={styles.selectedItem_closeIcon}
        data-value={props.title}
        onClick={(e) => {
          props.onClick(e);
        }}
      >
        <AiOutlineClose />
      </div>
    </li>
  );
};

export default SelectedItem;
