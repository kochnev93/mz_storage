import React from "react";
import styles from "./MyDropdown.module.scss";
import cx from "classnames";

export const ListOptions = ({
  options,
  isOpen,
  liHandler,
  isLoaded,
  searchInput,
  selectOptionAll,
  selectAll,
  multiple,
}) => {
  const getListOptions = (list) => {
    if (!isLoaded) return "Загрузка...";
    if (list?.length === 0) return "Ничего не найдено";
    return list;
  };

  // Выборка элементов списка согласно поисковой строки
  let searchOptions = options?.filter((option) =>
    option.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  let listOptions = searchOptions
    ?.sort((a, b) => b.isCheked - a.isCheked)
    .map((option) => {
      return (
        <li
          key={option.id}
          className={cx({ [styles.checked]: option.isCheked })}
          onClick={(e) => {
            liHandler(e);
          }}
          data-value={option.title}
          data-id={option.id}
        >
          {option.title}
        </li>
      );
    });

  let buttonSelectAll;
  if (!searchInput && multiple && isLoaded) {
    buttonSelectAll = (
      <button
        className={cx(styles.select_all, {
          [styles.checked]: selectOptionAll,
        })}
        onClick={(e) => {
          selectAll(e);
        }}
      >
        Выбрать все
      </button>
    );
  }

  return (
    <ul
      className={cx(styles.myDropdown__listItems, {
        [styles.open]: isOpen,
      })}
    >
      {buttonSelectAll}
      {getListOptions(listOptions)}
    </ul>
  );
};
