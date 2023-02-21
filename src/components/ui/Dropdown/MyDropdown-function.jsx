//Компонент в стадии разработки

import React, { useState, useEffect, useRef } from "react";
import styles from "./MyDropdown.module.scss";
import { AiOutlineClose } from "react-icons/Ai";
import { MdKeyboardArrowDown } from "react-icons/Md";
import { MdKeyboardArrowUp } from "react-icons/Md";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch.js";

const Dropdown = (props) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef();
  const { fetchNow } = useFetch();

  // REdux state
  const { statusApp, warehouses, category } = useSelector(
    (state) => state.app_state
  );
  console.log("MY_DROPDOWN_DATA", { warehouses, category });

  // Local State
  const [type] = useState(props.type);
  const [options, setOptions] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [disabled, setDisabled] = useState(props.disabled || false);
  const [multiple] = useState(props.multiple || false);
  const [url, setUrl] = useState(props.url);

  const [id] = useState(props.id);
  const [title] = useState(props.title || "Название");
  const [placeholder] = useState(props.placeholder || "Выберите...");
  const [searchInput, setSearchInput] = useState("");
  const [selectOptionAnyone, setSelectOptionAnyone] = useState(false);
  const [selectOptionAll, setSelectOptionAll] = useState(false);

  const [reset] = useState();

  useEffect(() => {
    getContent();
  }, [url]);

  useEffect(() => {
    clearDropdown();
  }, [reset]);

  {
    this.props.reset ? this.clearDropdown() : null;
  }

  useEffect(() => {
    switch (props.type) {
      case "warehouse":
        setOptions(warehouses);
        break;
      case "category":
        setOptions(category);
        break;
    }
  }, []);

  useEffect(() => {
    dropdownRef.current.addEventListener("mousedown", handleClickOutside);
    return () =>
      dropdownRef.current.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Отслеживание клика вне компонента
  const handleClickOutside = (e) => {
    if (!dropdownRef.current.contains(e.target) && isOpen) {
      setIsOpen(false);
    }
  };

  const isSelectedAll = (arr) => {
    // Проверяем все ли элементы выделены
    return arr.every((option) => option.isCheked === true);
  };

  const isSelectedAnyone = (arr) => {
    // Проверяем выделен ли какой нибудь элемент списка
    return arr.some((option) => option.isCheked === true);
  };

  // Получение контента
  const getContent = async () => {
    if (options.length === 0) {
      let requestOptions = {
        method: "GET",
      };

      const result = await fetchNow(
        `${process.env.REACT_APP_API_SERVER}/${url}`,
        requestOptions
      );

      setOptions(result.data);
    }
  };

  const liHandler = (e) => {
    e.stopPropagation();

    // Находим индекс элемента, который выбрали
    let indexOption = this.state.options.findIndex(
      (item) => item.id == e.target.dataset.id
    );

    // Создаем новое состояние
    let newOptions = options.map((option, index) => {
      if (index === indexOption) {
        option.isCheked = !option.isCheked;
        return option;
      } else if (!multiple) {
        option.isCheked = false;
        return option;
      } else return option;
    });

    // Обновляем состояние
    let selectedAnyone = isSelectedAnyone(newOptions);
    let selectedAll = isSelectedAll(newOptions);

    setOptions(newOptions);
    setSelectOptionAnyone(selectedAnyone);
    setSelectOptionAll(selectedAll);

    // Передача значений родителю
    if (props.changeValue) {
      getSelectedOptions();
    }

    // Если не выбран множественный выбор, то меню закрывается при выборе элемента
    if (!multiple) {
      setIsOpen(false);
    }
  };

  const getSelectedOptions = () => {
    // Передача состояния родителю
    let selectedOptions = options.filter((option) => {
      return option.isCheked;
    });

    console.log("selectedOptions", selectedOptions);

    props.changeValue([...selectedOptions]);
  };

  const clearDropdown = () => {
    if (props.reset) {
      let newOptions = options.map((option) => {
        option.isCheked = false;
        return option;
      });

      props.setReset();

      setOptions(newOptions);
      setSelectOptionAnyone(false);
      setSelectOptionAll(false);
    }
  };

  const selectAll = (e) => {
    // Обработчик кнопки - Выбрать все
    e.preventDefault();
    e.stopPropagation();

    // Создаем новое состояние
    let newOptions = options.map((option) => {
      if (!selectOptionAll) {
        option.isCheked = true;
        return option;
      } else {
        option.isCheked = false;
        return option;
      }
    });

    let selectedAll = selectOptionAll ? false : true;
    let selectedAnyone = selectedAll;

    // Обновляем состояние
    setOptions(newOptions);
    setSelectOptionAnyone(selectedAnyone);
    setSelectOptionAll(selectedAll);

    if (props.changeValue) {
      getSelectedOptions();
    }
  };

  const closeAll = (e) => {
    e.stopPropagation();

    // Создаем новое состояние
    let newOptions = options.map((option) => {
      option.isCheked = false;
      return option;
    });

    setOptions(newOptions);
    setSelectOptionAnyone(false);
    setSelectOptionAll(false);

    if (props.changeValue) {
      getSelectedOptions();
    }
  };

  const searchOption = (e) => {
    setSearchInput(e.target.value);
  };

  const getListOptions = (list) => {
    if (!isLoaded) return "Загрузка...";
    if (list.length === 0) return "Ничего не найдено";
    return list;
  };

  return (
    <div
      id={id}
      ref={dropdownRef}
      className={cx(styles.myDropdown, { [styles.disabled]: disabled })}
    >
      <div className={styles.myDropdown__wrapper}>
        <div
          className={styles.myDropdown__container}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <ul className={styles.myDropdown_menuSelectedItems}>
            {countSelected < 2 ? (
              optionsSelected
            ) : (
              <li>
                <div className={styles.selectedItem_title}>
                  Выбрано: {countSelected} знач.
                </div>
                <div
                  className={styles.selectedItem_closeIcon}
                  onClick={this.closeAll}
                >
                  <AiOutlineClose />
                </div>
              </li>
            )}
          </ul>
          <input
            className={cx(styles.myDropdown_input, {
              [styles.empty]:
                this.state.selectOptionAnyone || this.state.searchInput,
            })}
            onChange={this.searchOption}
            value={this.state.searchInput}
          />

          {this.state.searchInput && (
            <AiOutlineClose
              className={styles.input_clear}
              title="Очистить"
              onClick={() => {
                this.setState({ searchInput: "" });
              }}
            />
          )}

          {this.state.isOpen ? (
            <MdKeyboardArrowUp onClick={this.closeDropdown} />
          ) : (
            <MdKeyboardArrowDown onClick={this.openDropdown} />
          )}

          <label className={styles.myDropdown_label}>
            {this.state.selectOptionAnyone || this.state.searchInput
              ? this.state.title
              : this.state.placeholder}
          </label>

          <fieldset
            className={cx(styles.myDropdown_fieldset, {
              [styles.error]: !this.props.validation,
            })}
          >
            <legend>
              <span>{this.state.title}</span>
            </legend>
          </fieldset>
        </div>

        <ul
          className={cx(styles.myDropdown__listItems, {
            [styles.open]: this.state.isOpen,
          })}
        >
          {buttonSelectAll}
          {this.getListOptions(listOptions)}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class MyDropdown extends Component {
  render() {
    //Количество выбранных элементов
    let countSelected = 0;

    // Выборка элементов списка согласно поисковой строки
    let options = this.state.options.filter((option) =>
      option.title.toLowerCase().includes(this.state.searchInput.toLowerCase())
    );

    let listOptions = options
      .sort((a, b) => b.isCheked - a.isCheked)
      .map((option) => {
        return (
          <li
            key={option.id}
            className={cx({ [styles.checked]: option.isCheked })}
            onClick={this.liHandler}
            data-value={option.title}
            data-id={option.id}
          >
            {option.title}
          </li>
        );
      });

    let optionsSelected = this.state.options.map((option) => {
      if (option.isCheked) {
        countSelected++;
        return (
          <li key={option.id} onClick={this.liHandler}>
            <div className={styles.selectedItem_title}>{option.title}</div>
            <div
              className={styles.selectedItem_closeIcon}
              onClick={this.liHandler}
              data-value={option.title}
            >
              <AiOutlineClose />
            </div>
          </li>
        );
      }
    });

    let buttonSelectAll;
    if (!this.state.searchInput && this.state.multiple && this.state.isLoaded) {
      buttonSelectAll = (
        <button
          className={cx(styles.select_all, {
            [styles.checked]: this.state.selectOptionAll,
          })}
          onClick={this.selectAll}
        >
          Выбрать все
        </button>
      );
    }

    return (
      <div
        id={this.state.id}
        className={cx(styles.myDropdown, {
          [styles.disabled]: this.props.disabled,
        })}
      >
        <div className={styles.myDropdown__wrapper}>
          <div
            className={styles.myDropdown__container}
            onClick={this.openDropdown}
          >
            <ul className={styles.myDropdown_menuSelectedItems}>
              {countSelected < 2 ? (
                optionsSelected
              ) : (
                <li>
                  <div className={styles.selectedItem_title}>
                    Выбрано: {countSelected} знач.
                  </div>
                  <div
                    className={styles.selectedItem_closeIcon}
                    onClick={this.closeAll}
                  >
                    <AiOutlineClose />
                  </div>
                </li>
              )}
            </ul>
            <input
              className={cx(styles.myDropdown_input, {
                [styles.empty]:
                  this.state.selectOptionAnyone || this.state.searchInput,
              })}
              onChange={this.searchOption}
              value={this.state.searchInput}
            />

            {this.state.searchInput && (
              <AiOutlineClose
                className={styles.input_clear}
                title="Очистить"
                onClick={() => {
                  this.setState({ searchInput: "" });
                }}
              />
            )}

            {this.state.isOpen ? (
              <MdKeyboardArrowUp onClick={this.closeDropdown} />
            ) : (
              <MdKeyboardArrowDown onClick={this.openDropdown} />
            )}

            <label className={styles.myDropdown_label}>
              {this.state.selectOptionAnyone || this.state.searchInput
                ? this.state.title
                : this.state.placeholder}
            </label>

            <fieldset
              className={cx(styles.myDropdown_fieldset, {
                [styles.error]: !this.props.validation,
              })}
            >
              <legend>
                <span>{this.state.title}</span>
              </legend>
            </fieldset>
          </div>

          <ul
            className={cx(styles.myDropdown__listItems, {
              [styles.open]: this.state.isOpen,
            })}
          >
            {buttonSelectAll}
            {this.getListOptions(listOptions)}
          </ul>
        </div>
      </div>
    );
  }
}

//export default MyDropdown;
