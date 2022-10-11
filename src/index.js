import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RequireAuth } from './hoc/RequireAuth.jsx';
import Advt from './components/elements/advt/Advt.jsx';

//Pages
import { About } from './pages/About/About.jsx';
import { Dashboard } from './pages/Dashboard/Dashboard.jsx';
import { Admin } from './pages/Admin/Admin.jsx';
import { Auth } from './pages/Auth/Auth.jsx';

//Pages for Admin
import { Nomenclature } from './components/Admin/Nomenclature/Nomenclature.jsx';

// Redux
import { store } from './store/store';
import { Provider } from 'react-redux';

import './style/styles.module.scss';
import './style/vars.css';
import './index.css';



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Advt />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        
          <Route
            path="about"
            element={
              <RequireAuth>
                <About />
              </RequireAuth>
            }
          />
          <Route
            path="admin/*"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          >
            <Route path="products" element={<h1>Hello products</h1>} />
            <Route path="nomenclature" element={<Nomenclature />} />
          </Route>
          <Route
            path="login"
            element={<Auth />}
          />

        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
