import React, { Component, useState, useEffect } from 'react';
import styles from './table.module.scss';
import { MyTable } from '../elements/Table/MyTable.jsx';
import { MyInputSearch } from '../elements/Form/InputSearch/MyInputSearch.jsx';
import { MyInputSubmit } from '../elements/Form/InputSubmit/MyInputSubmit.jsx';
import MyButton from '../ui/Buttons/ButtonSend.jsx';
import MyDropdown from '../ui/Dropdown/MyDropdown.jsx';
import cx from 'classnames';
import authHeader from '../../services/auth-header';


export const Table = () => {
  const [warehouse, setWarehouse] = useState([]);
  const [validationWarehouse, setValidationWarehouse] = useState(true);
  const [category, setCategory] = useState([]);
  const [validationCategory, setValidationCategory] = useState(true);
  const [data, setData] = useState([]);
  const [titleColumn, setTitleColumn] = useState([
    '№ п/п',
    'Склад',
    'Категория',
    'Наименование',
    's/n',
    'Количество',
    'Действия',
  ]);

  useEffect(() => {
    setWarehouse(JSON.parse(localStorage.getItem('mz_dashboard_warehouse')));
    setCategory(JSON.parse(localStorage.getItem('mz_dashboard_category')));
  }, []);

  useEffect(() => {
    localStorage.setItem('mz_dashboard_warehouse', JSON.stringify(warehouse));
    localStorage.setItem('mz_dashboard_category', JSON.stringify(category));
  }, [warehouse, category]);

  const search = (e) => {
    e.preventDefault();
    let validation = validationForm();

    if (validation) {
      console.log('send');
      fetchData();
    } else {
      console.log('error');
    }
  };

  const validationForm = () => {
    let countError = 0;

    setValidationWarehouse(true);
    setValidationCategory(true);

    if (warehouse.length === 0) {
      setValidationWarehouse(false);
      countError++;
    }

    if (category.length === 0) {
      setValidationCategory(false);
      countError++;
    }

    return countError == 0 ? true : false;
  };

  const fetchData = async () => {

    let myHeaders = new Headers();
    myHeaders.append('content-type', 'application/json');
    myHeaders.append('Authorization', `${ authHeader() }`);

    const data = JSON.stringify( {warehouse: warehouse, category: category} );

    let requestOptions = {
      //mode: 'no-cors',
      method: 'POST',
      headers: myHeaders,
      body: data,
    };

    fetch('http://localhost:3001/api/get_products', requestOptions)
      .then((res) => {
        console.log(res);

        if (!res.ok) {
          throw new Error(`${res.status}. ${res.statusText}`);
        } else {
          return res.json();
        }
      })
      .then(result => {
        console.log(result);
        setData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="dashboard">
      <form className={styles.form_dashboard_filter}>
        <div>
          <MyDropdown
            id="dashboard_warehouse"
            title="Склад"
            placeholder="Выберите склад"
            multiple={true}
            validation={validationWarehouse}
            changeValue={setWarehouse}
          />
        </div>

        <div>
          <MyDropdown
            id="dashboard_category"
            title="Категория"
            placeholder="Выберите категорию"
            multiple={true}
            validation={validationCategory}
            changeValue={setCategory}
          />
        </div>

        <div>
          <MyButton
            type="send"
            action={search}
            title="Найти"
            loadingTitle="Загрузка"
          />
        </div>
      </form>

      <MyTable titleColumn={titleColumn} content={data} />
    </div>
  );
};

// class Table extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filter_warehouse: '',
//       filter_category: '',
//       filter_search: '',
//       filter_message: null,
//       isLoaded: false,
//       data: [],
//       error: null,
//       errorWindowHidden: true,
//     };

//     this.filter_warehouse = this.filter_warehouse.bind(this);
//     this.filter_category = this.filter_category.bind(this);
//     this.get_list = this.get_list.bind(this);
//   }

//   componentDidMount() {}

//   // Обработчик, фильтр Склад
//   filter_warehouse = (e) => {
//     e.preventDefault();
//     this.setState({ filter_warehouse: e.target.value });
//   };

//   // Обработчик, фильтр Категория
//   filter_category = (e) => {
//     e.preventDefault();
//     this.setState({ filter_category: e.target.value });
//   };

//   closeError = (e) => {
//     e.preventDefault();
//     this.setState({ errorWindowHidden: !this.state.errorWindowHidden });
//   };

//   // Получение списка оборудования
//   get_list = (e) => {
//     e.preventDefault();

//     //const { filter_warehouse, filter_category } = this.state;

//     let myHeaders = new Headers();
//     myHeaders.append('content-type', 'application/json');

//     let data = JSON.stringify(this.state);

//     let requestOptions = {
//       //mode: 'no-cors',
//       method: 'POST',
//       headers: myHeaders,
//       body: data,
//     };

//     fetch('http://localhost:3001/test', requestOptions)
//       .then((res) => {
//         console.log(res);

//         if (!res.ok) {
//           throw new Error(`${res.status}. ${res.statusText}`);
//         } else {
//           return res.json();
//         }
//       })
//       .then((result) => {
//         if (result.error) {
//           this.setState({
//             isLoaded: false,
//             error: result.error,
//             errorWindowHidden: false,
//           });
//         } else {
//           this.setState({
//             isLoaded: true,
//             data: result.data,
//             error: null,
//             errorWindowHidden: true,
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   render() {
//     const array = [
//       {
//         title: 'Крыленко',
//       },
//       {
//         title: 'Долгоозёрная',
//       },
//     ];

//     const titleColumn = [
//       '№ п/п',
//       'Склад',
//       'Категория',
//       'Наименование',
//       's/n',
//       'Количество',
//       'Действия',
//     ];

//     return (
//       <div className="dashboard">
//         <form className={styles.form_dashboard_filter}>
//           <div>
//             <MyDropdown
//               id="warehouse"
//               title="Склад"
//               placeholder="Выберите склад"
//               multiple={true}
//               validation={true}
//             />
//           </div>

//           <div>
//             <MyDropdown
//               id="category"
//               title="Категория"
//               placeholder="Выберите категорию"
//               multiple={true}
//               validation={true}
//             />
//           </div>

//           <div>
//             <MyInputSearch />
//           </div>

//           <div>
//             <MyInputSubmit onClick={this.get_list} />
//           </div>
//         </form>

//         {this.state.filter_message && (
//           <p className={styles.filter_message}>{this.state.filter_message}</p>
//         )}

//         <MyTable titleColumn={titleColumn} content={this.state.data} />

//         <div
//           className={cx(styles.error, {
//             [styles.close]: this.state.errorWindowHidden,
//           })}
//         >
//           <div>Error: {this.state.error}</div>
//           <div>
//             <button onClick={this.closeError}>Close</button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default Table;
