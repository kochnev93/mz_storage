import React from 'react';
import cx from 'classnames';

// Styles
import styles from './Tabs.module.scss';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../features/modal/about-productSlice';



export const Tabs = (props) => {
  const dispatch = useDispatch();

  // Redux State
  const activeTab = useSelector((state) => state.modal_about_product.indexActiveTab);

  let array = Array.prototype.slice.call(props.children, 0);

  const tabMenu = array.map((item, index) => {
    return (
      <li
        index={index}
        key={item.props.label}
        className={cx(styles.tabs_link, {
          [styles.active]: activeTab === index,
        })}
        onClick={() => {
          dispatch(setActiveTab({activeTab: index}));
        }}
      >
        {item.props.label}
      </li>
    );
  });

  const tabContent = array.map((item, index) => {
    return (
      <div
        index={index}
        className={cx(styles.tabs_item, {
          [styles.active]: index === activeTab,
        })}
      >
        {item}
      </div>
    );
  });

  return (
    <div className={styles.tabs}>
      <div className={styles.tabs_header}>
        <ul className={styles.tabs_menu}>{tabMenu}</ul>
      </div>
      <div className={styles.tabs_content}>{tabContent}</div>
    </div>
  );
};
