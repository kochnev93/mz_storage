//Компонент в стадии разработки

import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./MyDropdown.module.scss";

import { MdKeyboardArrowDown } from "react-icons/Md";
import { MdKeyboardArrowUp } from "react-icons/Md";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch.js";
import { MenuSelectedItems } from "./MenuSelectedItems.jsx";
import { ListOptions } from "./ListOptions.jsx";
import { SearchInput } from "./SearchInput.jsx";

const Dropdown = (props) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { fetchNow } = useFetch();

  //REdux state
  // const { warehouses, category } = useSelector((state) => state.app_state);
  // console.log("MY_DROPDOWN_DATA", { warehouses, category });

  // Local State
  const [type] = useState(props.type);
  const [options, setOptions] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [disabled, setDisabled] = useState(props.disabled || false);
  const [multiple] = useState(props.multiple);
  const [url, setUrl] = useState(props.url);

  const [id] = useState(props.id);
  const [title] = useState(props.title || "Название");
  const [placeholder] = useState(props.placeholder || "Выберите...");
  const [searchInput, setSearchInput] = useState("");
  const [selectOptionAnyone, setSelectOptionAnyone] = useState(props.selectOptionAnyone ? props.selectOptionAnyone : false);
  const [selectOptionAll, setSelectOptionAll] = useState(false);

  const [reset] = useState(props.reset);

  const memoOptions = useMemo(() => {
    return props?.options?.map((item) => {
      return { ...item };
    });
  }, [props.options]);

  useEffect(() => {
    getContent();
  }, [url]);

  useEffect(() => {
    setOptions(memoOptions);
  }, [memoOptions]);

  useEffect(() => {
    clearDropdown();
  }, [reset]);

  // useEffect(() => {
  //   switch (props.type) {
  //     case "warehouse":
  //       let tempWarehouse = warehouses.map((warehouse) => {
  //         return { ...warehouse };
  //       });
  //       setOptions(tempWarehouse);
  //       break;
  //     case "category":
  //       let tempCategory = category.map((category) => {
  //         return { ...category };
  //       });
  //       setOptions(tempCategory);
  //       break;
  //     default:
  //       setOptions([]);
  //   }
  // }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Отслеживание клика вне компонента
  const handleClickOutside = (e) => {
    if (!dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const openDropdown = () => {
    setIsOpen(true)
  }

  const closeDropdown = () => {
    setIsOpen(false);
    setSearchInput("");
  }

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
    if (options?.length === 0 && url) {
      let requestOptions = {
        method: "GET",
      };

      const result = await fetchNow(
        `${process.env.REACT_APP_API_SERVER}/${url}`,
        requestOptions
      );

      setOptions(result.data);
      setIsLoaded(true);
    }
  };

  const liHandler = (e) => {
    e.stopPropagation();

    // Находим индекс элемента, который выбрали
    let indexOption = options.findIndex(
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
    setSearchInput("")

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
          <MenuSelectedItems
            options={options}
            liHandler={liHandler}
            closeAll={closeAll}
          />

          <SearchInput
            searchInput={searchInput}
            onChange={searchOption}
            selectOptionAnyone={selectOptionAnyone}
            setSearchInput={() => {
              setSearchInput("");
            }}
          />

          {/* {searchInput && (
            <AiOutlineClose
              className={styles.input_clear}
              title="Очистить"
              onClick={() => {
                setSearchInput("");
              }}
            />
          )} */}

          {isOpen ? (
            <MdKeyboardArrowUp
              onClick={() => {
                setIsOpen(false);
              }}
            />
          ) : (
            <MdKeyboardArrowDown
              onClick={() => {
                setIsOpen(true);
              }}
            />
          )}

          <label className={styles.myDropdown_label}>
            {selectOptionAnyone || searchInput ? title : placeholder}
          </label>

          <fieldset
            className={cx(styles.myDropdown_fieldset, {
              [styles.error]: !props.validation,
            })}
          >
            <legend>
              <span>{title}</span>
            </legend>
          </fieldset>
        </div>

        <ListOptions
          options={options}
          isOpen={isOpen}
          liHandler={liHandler}
          isLoaded={isLoaded}
          searchInput={searchInput}
          selectOptionAll={selectOptionAll}
          selectAll={selectAll}
          multiple={multiple}
        />
      </div>
    </div>
  );
};

export default Dropdown;
