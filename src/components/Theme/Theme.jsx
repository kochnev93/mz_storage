import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import { setTheme } from '../../features/app/appSlice';

import { MdNightlight } from 'react-icons/Md';
import { MdLightMode } from 'react-icons/Md';

const Theme = ({ className }) => {
  const { theme } = useSelector((state) => state.app_state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('mz_theme', theme);
  }, [theme]);

  const handleChange = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(next));
  };

  return (
    < > 
      {theme === 'dark' ? (
        <MdLightMode className={className} title="Светлая тема" onClick={handleChange}/>
      ) : (
        <MdNightlight className={className} title="Темная тема" onClick={handleChange}/>
      )}
    </>
  );
};

export default Theme;
