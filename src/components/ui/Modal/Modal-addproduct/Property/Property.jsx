import React from 'react';

//Styles
import styles from './Property.module.scss';

// Components
import MyDropdown from '../../../Dropdown/MyDropdown.jsx';
import MyInput from '../../../Input/MyInput.jsx';

export function Property({property, changeValue}) {

  const propertyList = property.map((item, index) => {
    return(
      <div key={index} className={styles.property_item}>
        <MyDropdown
          id={`property_${index}`}
          title={item.property}
          placeholder={item.property}
          multiple={false}
          options={item.value}
          validation={true}
          changeValue={changeValue}
          property={property}
        />
      </div>
    );
  });


  return (
    <div className={styles.property}>
      <h4>Характеристики</h4>
      <p>Заполните характеристики товара. Если каких-то свойств не хватает, то обратитесь к администратору</p>
      {propertyList.length !== 0 ? propertyList : 'Для данной категории характеристики не найдены'}
    </div>
  );
}
