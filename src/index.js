import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RequireAuth } from './hoc/RequireAuth.jsx';
import Advt from './components/elements/advt/Advt.jsx';

import Favicon from 'react-favicon';

// Pages
import { About } from './pages/About/About.jsx';
import { Dashboard } from './pages/Dashboard/Dashboard.jsx';
import { Admin } from './pages/Admin/Admin.jsx';
import { Auth } from './pages/Auth/Auth.jsx';
import { Error } from './pages/Error/Error.jsx';
import { Nomenclature } from './pages/Nomenclature/Nomenclature.jsx';
import { Receipt } from './pages/Receipt/Receipt.jsx';
import { Warehouses } from './pages/Warehouses/Warehouses.jsx';

// Redux
import { store } from './store/store';
import { Provider } from 'react-redux';

// Styles
import './style/styles.module.scss';
import './style/vars.css';
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <div><Favicon url="../favicon.ico"/></div>
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
            path="nomenclature"
            element={
              <RequireAuth>
                <Nomenclature />
              </RequireAuth>
            }
          />

          <Route
            path="receipt"
            element={
              <RequireAuth>
                <Receipt />
              </RequireAuth>
            }
          />

          <Route
            path="warehouses"
            element={
              <RequireAuth>
                <Warehouses />
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
              <RequireAuth onlyAdmin={true}>
                <Admin />
              </RequireAuth>
            }
          >
            <Route path="products" element={<h1>Hello products</h1>} />
            {/* <Route path="nomenclature" element={<Nomenclature />} /> */}
            {/* <Route path="*" element={ <Error message={"Страница не найдена"}/> }/> */}
          </Route>

          <Route path="login" element={<Auth />} />

          <Route path="*" element={<Error message={'Страница не найдена'} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
