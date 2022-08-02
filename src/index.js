import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Pages
import { About } from './pages/About/About.jsx';
import { Dashboard } from './pages/Dashboard/Dashboard.jsx';
import { Admin } from './pages/Admin/Admin.jsx';


// Redux
import { store } from './store/store';
import { Provider } from 'react-redux';

import './style/styles.module.scss';
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

