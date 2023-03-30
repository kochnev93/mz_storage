import React from 'react';
import { MainWrapper } from '../../components/MainWrapper.jsx';

import styles from '../style.module.scss';

const About = () => {
  return (
    <MainWrapper header_title="О приложении" title={process.env.REACT_APP_NAME}>
      <p>Версия: {process.env.REACT_APP_VERSION}</p>
    </MainWrapper>
  );
};

export default About;

