import React from 'react';
import { MainWrapper } from '../MainWrapper.jsx';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

import styles from './Preloader.module.scss';

const Preloader = () => {


  return (
    <>
      <MainWrapper header_title="Склад" title=" ">
        <CSSTransition in={true} timeout={500} className={styles.animation}>
            <div className={styles.preload}></div>
        </CSSTransition> 
      </MainWrapper>
    </>
  );
};


export default Preloader;