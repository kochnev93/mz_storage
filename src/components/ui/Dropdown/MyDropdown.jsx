import React, { Component } from 'react';
import styles from './MyDropdown.module.scss';
import { AiOutlineClose } from 'react-icons/Ai';
import {MdKeyboardArrowDown} from 'react-icons/Md';
import {MdKeyboardArrowUp} from 'react-icons/Md';
import cx from 'classnames';

class MyDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title || 'Название',
      placeholder: props.placeholder || 'Выберите...',
      searchInput: '',
      isOpen: false,
      selectOptionAnyone: false,
      selectOptionAll: false,
      multiple: props.multiple,
      isLoaded: false,
      // options: [
      //   {
      //     id: 1,
      //     title: 'Дунайский',
      //     isCheked: false,
      //   },
      //   {
      //     id: 2,
      //     title: 'Крыленко',
      //     isCheked: false,
      //   },
      //   {
      //     id: 3,
      //     title: 'Яхтенная',
      //     isCheked: false,
      //   },
      //   {
      //     id: 4,
      //     title: 'Бухарестская',
      //     isCheked: false,
      //   },
      //   {
      //     id: 5,
      //     title: 'Победы',
      //     isCheked: false,
      //   },
      //   {
      //     id: 6,
      //     title: 'Лаврики',
      //     isCheked: false,
      //   },
      //   {
      //     id: 7,
      //     title: 'Стачек 28',
      //     isCheked: false,
      //   },
      //   {
      //     id: 8,
      //     title: 'Стачек 92',
      //     isCheked: false,
      //   },
      //   {
      //     id: 9,
      //     title: 'Славы 21',
      //     isCheked: false,
      //   },
      //   {
      //     id: 10,
      //     title: 'Славы 52',
      //     isCheked: false,
      //   },
      //   {
      //     id: 11,
      //     title: 'Оптиков',
      //     isCheked: false,
      //   },
      //   {
      //     id: 12,
      //     title: 'Пятилеток',
      //     isCheked: false,
      //   },
      // ],
      options: []
    };

    this.openDropdown = this.openDropdown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.getContent(this.state.id);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  getContent = (id) => {
    let myHeaders = new Headers();
    myHeaders.append('content-type', 'application/json');

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
    };

    fetch(`http://localhost:3001/api/get_${id}`, requestOptions)
      .then((res) => {

        if (!res.ok) {
          throw new Error(`${res.status}. ${res.statusText}`);
        } else {
          return res.json();
        }
      })
      .then((result) => {
        if (!result.error) {
          this.setState({
            isLoaded: true,
            options: result.data
          });
        } 
      })
      .catch((err) => {
        console.log(err);
      });
  }

  isSelectedAll = (arr) => {
    // Проверяем все ли элементы выделены
    // true - все элементы выделены
    // false - не все элементы выделены
    return arr.every((option) => option.isCheked === true);
  };

  isSelectedAnyone = (arr) => {
    // Проверяем выделен ли какой нибудь элемент списка
    return arr.some((option) => option.isCheked === true);
  };

  handleClickOutside = (e) => {
    // Отслеживаем клик вне компонента
    const dropdown = document.getElementById(this.state.id);
    if (!dropdown.contains(e.target) && this.state.isOpen) {
      this.closeDropdown();
    } 
  };

  openDropdown = () => {
    if (!this.state.isOpen){
      this.setState({ isOpen: true });
    }
    
  };

  closeDropdown = () => {
    this.setState({ isOpen: false, searchInput: '' });
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
      } else if(!this.state.multiple){
        option.isCheked = false;
        return option;
      } else return option;
    });

    // Обновляем состояние
    let selectedAnyone = this.isSelectedAnyone(newOptions);
    let selectedAll = this.isSelectedAll(newOptions);

    this.setState({
      options: newOptions,
      selectOptionAll: selectedAll,
      selectOptionAnyone: selectedAnyone
    });
    
    this.getSelectedOptions();
  };

  selectAll = (e) => {
    // Обработчик кнопки - Выбрать все
    e.preventDefault();
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

    let selectedAll = this.state.selectOptionAll ? false : true;
    let selectedAnyone = selectedAll;

    // Обновляем состояние
    this.setState({
      options: newOptions,
      selectOptionAll: selectedAll,
      selectOptionAnyone: selectedAnyone
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
      selectOptionAnyone: false
    });
  };

  searchOption = (e) => {
    this.setState({ 
      searchInput: e.target.value,
    });
  };

getListOptions = (list) => {
  if (!this.state.isLoaded) return 'Загрузка...';
  if (list.length === 0) return 'Ничего не найдено';
  return list;
};

getSelectedOptions = () => {
  let options = this.state.options.filter( option => {
    return option.isCheked
  });

  if(this.props.changeValue){
    this.props.changeValue(options);
  }
}

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
          return (
            <li
              key={option.id}
              className={cx({ [styles.checked]: option.isCheked })}
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
    if (!this.state.searchInput && this.state.multiple && this.state.isLoaded) {
      buttonSelectAll = (
        <button
          className={ cx(styles.select_all, {[styles.checked]: this.state.selectOptionAll}) }
          onClick={this.selectAll}
        >
          Выбрать все
        </button>
      );
    }


    return (
      <div id={this.state.id} className={styles.myDropdown}>
        <div className={styles.myDropdown__wrapper}>

          <div className={styles.myDropdown__container} onClick={this.openDropdown}>

            <ul className={styles.myDropdown_menuSelectedItems}>
              { countSelected < 2 ? optionsSelected : 
                <li>
                  <div className={styles.selectedItem_title}>Выбрано: {countSelected} знач.</div>
                  <div className={styles.selectedItem_closeIcon} onClick={this.closeAll}><AiOutlineClose /></div>
                </li>
              }
            </ul>
            <input
              className={ 
                cx(styles.myDropdown_input, {[styles.empty]: this.state.selectOptionAnyone || this.state.searchInput}) 
              }
              onChange={this.searchOption} 
              value={this.state.searchInput}
            />

            {
              this.state.searchInput && 
              <AiOutlineClose 
                className={styles.input_clear} 
                title="Очистить" 
                onClick={ () => {this.setState({searchInput: ''})} }
              />
            }

            {this.state.isOpen ? <MdKeyboardArrowUp onClick={this.closeDropdown} /> : <MdKeyboardArrowDown onClick={this.openDropdown} />}


            <label className={styles.myDropdown_label}>
              {this.state.selectOptionAnyone || this.state.searchInput ? this.state.title : this.state.placeholder}
            </label>

            <fieldset className={cx(styles.myDropdown_fieldset, {[styles.error]: !this.props.validation} )}>
              <legend>
                <span>{this.state.title}</span>
              </legend>
            </fieldset>

          </div>

          <ul className={cx(styles.myDropdown__listItems, {[styles.open]: this.state.isOpen})}>
            {buttonSelectAll}
            { this.getListOptions(listOptions)}
          </ul>

          <ul>
           
          </ul>

        </div>
      </div>
    );
  }
}

export default MyDropdown;
