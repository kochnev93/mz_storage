import React from "react";
import styles from "./MyDropdown.module.scss";
import cx from "classnames";
import { AiOutlineClose } from "react-icons/Ai";

export const SearchInput = ({ selectOptionAnyone, searchInput, onChange, setSearchInput }) => {
  return (
    <>
      <input
        className={cx(styles.myDropdown_input, {
          [styles.empty]: selectOptionAnyone || searchInput,
        })}
        onChange={(e) => {
          onChange(e);
        }}
        value={searchInput}
      />

      {searchInput && (
        <AiOutlineClose
          className={styles.input_clear}
          title="Очистить"
          onClick={setSearchInput}
        />
      )}
    </>
  );
};
