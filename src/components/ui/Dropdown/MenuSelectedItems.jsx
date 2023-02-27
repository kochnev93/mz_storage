import React, { useState, useEffect, useRef } from "react";
import styles from "./MyDropdown.module.scss";
import { AiOutlineClose } from "react-icons/Ai";


export const MenuSelectedItems = ({ options, liHandler, closeAll }) => {
  let countSelected = 0;

  let optionsSelected = options?.map((option) => {
    if (option.isCheked) {
      countSelected++;
      return (
        <li key={option.id} onClick={(e) => liHandler(e)}>
          <div className={styles.selectedItem_title}>{option.title}</div>
          <div
            className={styles.selectedItem_closeIcon}
            //onClick={(e) => liHandler(e)}
            onClick={(e) => closeAll(e)}
            data-value={option.title}
          >
            <AiOutlineClose />
          </div>
        </li>
      );
    }
  });

  return (
    <ul className={styles.myDropdown_menuSelectedItems}>
      {countSelected < 2 ? (
        optionsSelected
      ) : (
        <li key={0}>
          <div className={styles.selectedItem_title}>
            Выбрано: {countSelected} знач.
          </div>
          <div
            className={styles.selectedItem_closeIcon}
            onClick={(e) => closeAll(e)}
          >
            <AiOutlineClose />
          </div>
        </li>
      )}
    </ul>
  );
};
