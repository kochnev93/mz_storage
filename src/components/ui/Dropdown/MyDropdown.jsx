import React, { Component } from 'react';
import styles from './MyDropdown.module.scss';
import { AiOutlineClose } from 'react-icons/Ai';
import cx from 'classnames';

class MyDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      isOpen: false,
      isEmpty: true,
      options: [
        {
          id: 1,
          title: 'Дунайский',
          isCheked: false,
        },
        {
          id: 2,
          title: 'Крыленко',
          isCheked: false,
        },
        {
          id: 3,
          title: 'Яхтенная',
          isCheked: false,
        },
        {
          id: 4,
          title: 'Бухарестская',
          isCheked: false,
        },
        {
          id: 5,
          title: 'Победы',
          isCheked: false,
        },
        {
          id: 6,
          title: 'Лаврики',
          isCheked: false,
        },
        {
          id: 7,
          title: 'Стачек 28',
          isCheked: false,
        },
        {
          id: 8,
          title: 'Стачек 92',
          isCheked: false,
        },
        {
          id: 9,
          title: 'Славы 21',
          isCheked: false,
        },
        {
          id: 10,
          title: 'Славы 52',
          isCheked: false,
        },
        {
          id: 11,
          title: 'Оптиков',
          isCheked: false,
        },
        {
          id: 12,
          title: 'Пятилеток',
          isCheked: false,
        },
      ],
      selectOptionAll: false,
    };

    this.openDropdown = this.openDropdown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  isSelectedAll = () => {
    // Проверяем все ли элементы выделены
    // true - все элементы выделены
    // false - не все элементы выделены
    return this.state.options.every((option) => option.isCheked === true);
  };

  isSelectedAnyone = () => {
    // Проверяем выделен ли какой нибудь элемент списка
    return this.state.options.some((option) => option.isCheked === true);
  };

  handleClickOutside = (e) => {
    // Отслеживаем клик вне компонента
    const dropdown = document.querySelector(`.${styles.myDropdown}`);
    if (!dropdown.contains(e.target) && this.state.isOpen) {
      this.closeDropdown();
    }
  };

  openDropdown = () => {
    // Открытие дропдауна
    const dropdown_list = document.getElementById('my_dropdown__list');
    dropdown_list.classList.add(`${styles.myDropdown__listItems__open}`);
    this.setState({ isOpen: true });
  };

  closeDropdown = () => {
    // закрытие дропдауна
    const dropdown_list = document.getElementById('my_dropdown__list');
    dropdown_list.classList.remove(`${styles.myDropdown__listItems__open}`);
    this.setState({ isOpen: false });
  };

  liHandler = (e) => {
    e.stopPropagation();

    // Находим индекс элемента, который выбрали
    let indexOption = this.state.options.findIndex(
      (item) => item.title === e.target.dataset.value
    );

    // Создаем новое состояние
    let newOptions = this.state.options.map((option, index) => {
      if (index === indexOption) {
        option.isCheked = !option.isCheked;
        return option;
      } else return option;
    });

    // Обновляем состояние
    if ( this.isSelectedAll() ) {
      this.setState({
        options: newOptions,
        selectOptionAll: true,
        searchInput: '',
      });
    } else {
      this.setState({
        options: newOptions,
        selectOptionAll: false,
        searchInput: '',
      });
    }

      // Обновляем состояние
      if ( this.isSelectedAnyone() ) {
        this.setState({
          isEmpty: false
        });
      } else {
        this.setState({
          isEmpty: true
        });
      }
  };

  selectAll = (e) => {
    e.stopPropagation();

    // Создаем новое состояние
    let newOptions = this.state.options.map((option) => {
      if (!this.state.selectOptionAll) {
        option.isCheked = true;
        return option;
      } else {
        option.isCheked = false;
        return option;
      }
    });

    // Обновляем состояние
    this.setState({
      options: newOptions,
      selectOptionAll: !this.state.selectOptionAll,
      isEmpty: false
    });
  };

  closeAll = (e) => {
    e.stopPropagation();

    // Создаем новое состояние
    let newOptions = this.state.options.map((option) => {
      option.isCheked = false;
      return option;
    });

    // Обновляем состояние
    this.setState({
      options: newOptions,
      selectOptionAll: false,
      isEmpty: true
    });
  };

  searchOption = (e) => {
    if( e.target.value ){
      this.setState({ 
        searchInput: e.target.value,
        isEmpty: false
      });
    } else{
      this.setState({ 
        searchInput: e.target.value,
        isEmpty: true
      });
    }
  };

  render() {
    //Количество выбранных элементов
    let countSelected = 0;

    // Выборка элементов списка согласно поисковой строки
    let options = this.state.options.filter( (option) =>
      option.title.toLowerCase().includes( this.state.searchInput.toLowerCase() )
    );

    let listOptions = options
      .sort( (a, b) => b.isCheked - a.isCheked )
      .map((option) => {
        if (option.isCheked) {
          return (
            <li
              key={option.id}
              className={styles.checked}
              onClick={this.liHandler}
              data-value={option.title}
            >
              {option.title}
            </li>
          );
        } else
          return (
            <li
              key={option.id}
              onClick={this.liHandler}
              data-value={option.title}
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
    if (this.state.searchInput.length === 0) {
      buttonSelectAll = (
        <button
          className={
            this.state.selectOptionAll
              ? `${styles.select_all} ${styles.select_all_checked}`
              : `${styles.select_all}`
          }
          onClick={this.selectAll}
        >
          Выбрать все
        </button>
      );
    }

    return (
      <div className={styles.myDropdown}>
        <div className={styles.myDropdown__wrapper}>

          <div className={styles.myDropdown__container} onClick={this.openDropdown}>

            <ul className={styles.myDropdown_menuSelectedItems}>
              { countSelected <= 2 ? optionsSelected : 
                <li>
                  <div className={styles.selectedItem_title}>Выбрано: {countSelected} знач.</div>
                  <div className={styles.selectedItem_closeIcon} onClick={this.closeAll}><AiOutlineClose /></div>
                </li>
              }
            </ul>

            <input
              className={ cx(styles.myDropdown_input, {[styles.empty]: !this.state.isEmpty}) }
              onChange={this.searchOption} 
              value={this.state.searchInput}
            />

            <label className={styles.myDropdown_label}>
              Склад
            </label>

            <fieldset className={styles.myDropdown_fieldset}>
              <legend>
                <span>Склад</span>
              </legend>
            </fieldset>

          </div>

          <ul id="my_dropdown__list" className={styles.myDropdown__listItems}>
            {buttonSelectAll}
            {listOptions.length === 0 ? (
              <li className={styles.nothing_found}>Ничего не найдено</li>
            ) : listOptions }
          </ul>

        </div>
      </div>
    );
  }
}

export default MyDropdown;
