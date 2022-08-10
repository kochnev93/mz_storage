import React, { Component } from 'react';
import styles from './table.module.scss';
import { Select } from '../elements/Form/Select/Select.jsx';
import { MyTable } from '../elements/Table/MyTable.jsx';
import { MyInputSearch } from '../elements/Form/InputSearch/MyInputSearch.jsx';
import { MyInputSubmit } from '../elements/Form/InputSubmit/MyInputSubmit.jsx';
import MyDropdown from '../ui/Dropdown/MyDropdown.jsx';
import { flexbox } from '@mui/system';



class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter_warehouse: '',
      filter_category: '',
      filter_search: '',
      filter_message: null,
      isLoaded: false,
      data: [],
      error: null,
      errorWindowHidden: true,
    };

    this.filter_warehouse = this.filter_warehouse.bind(this);
    this.filter_category = this.filter_category.bind(this);
    this.get_list = this.get_list.bind(this);
  }

  componentDidMount() {}

  // Обработчик, фильтр Склад
  filter_warehouse = (e) => {
    e.preventDefault();
    this.setState({ filter_warehouse: e.target.value });
  };

  // Обработчик, фильтр Категория
  filter_category = (e) => {
    e.preventDefault();
    this.setState({ filter_category: e.target.value });
  };

  closeError = (e) => {
    e.preventDefault();
    this.setState({ errorWindowHidden: !this.state.errorWindowHidden });
  };

  // Получение списка оборудования
  get_list = (e) => {
    e.preventDefault();

    const { filter_warehouse, filter_category } = this.state;

    if (filter_warehouse.length !== 0 && filter_category.length !== 0) {
      let myHeaders = new Headers();
      myHeaders.append('content-type', 'application/json');

      let data = JSON.stringify(this.state);

      let requestOptions = {
        //mode: 'no-cors',
        method: 'POST',
        headers: myHeaders,
        body: data,
      };

      fetch('http://localhost:3001/test', requestOptions)
        .then((res) => {
          console.log(res);

          if (!res.ok) {
            throw new Error(`${res.status}. ${res.statusText}`);
          } else {
            return res.json();
          }
        })
        .then((result) => {
          if (result.error) {
            this.setState({
              isLoaded: false,
              error: result.error,
              errorWindowHidden: false,
            });
          } else {
            this.setState({
              isLoaded: true,
              data: result.data,
              error: null,
              errorWindowHidden: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else{
      this.setState({ filter_message: 'Заполните поля "Склад" и "Категория"' });
    }
  };

  render() {
    const array = [
      {
        title: 'Крыленко',
      },
      {
        title: 'Долгоозёрная',
      },
    ];

    const titleColumn = [
      '№ п/п',
      'Склад',
      'Категория',
      'Наименование',
      's/n',
      'Количество',
      'Действия',
    ];

    return (
      <div className="dashboard">
        <form className={styles.form_dashboard_filter}>
          <div>
            <MyDropdown id='dropdown_storage' name='Склад' multiple={true} />
          </div>

          <div>
            <MyDropdown id='dropdown_category' name='Категория' multiple={true} />
          </div>

          <div>
            <MyInputSearch />
          </div>

          <div>
            <MyInputSubmit onClick={this.get_list} />
          </div>

        </form>

        {this.state.filter_message && <p className={styles.filter_message}>{this.state.filter_message}</p>}

        <MyTable titleColumn={titleColumn} content={this.state.data} />

        <div
          className={
            this.state.errorWindowHidden
              ? `${styles.error} ${styles.close}`
              : `${styles.error}`
          }
        >
          <div>Error: {this.state.error}</div>
          <div>
            <button onClick={this.closeError}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
