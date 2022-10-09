import React, { useState, useEffect } from 'react';

// Hooks
import useFetch from '../../../../../hooks/useFetch.js';

//Styles
import styles from './Property.module.scss';

// Components
import MyDropdown from '../../../Dropdown/MyDropdown.jsx';
import MyInput from '../../../Input/MyInput.jsx';

export function Property({category_id}) {
 console.log(category_id);

  //const [category, setCategory] = useState(category_id[0].id);

  //const [comment, setComment] = useState('');
  //const [validationComment, setValidationComment] = useState(true);

//console.log(category);
  const { data, error, isLoading } = useFetch(`http://localhost:3001/api/get_property/${category_id}`);

  console.log(data);


  return (
    <></>
    // <div className={styles.property}>
    //   <h4>Характеристики</h4>

    //   <MyDropdown
    //     id="addProductModal_unit"
    //     url={`get_property/${category}`}
    //     title="Цвет"
    //     placeholder="Единица измерения"
    //     multiple={false}
        
    //   />

    //   <MyInput
    //     tepe="text"
    //     title="Диагональ"
    //     changeValue={setComment}
    //     validation={validationComment}
    //     value={comment}
    //   />

    //   <MyInput
    //     tepe="text"
    //     title="Цвет"
    //     changeValue={setComment}
    //     validation={validationComment}
    //     value={comment}
    //   />
    // </div>
  );
}
