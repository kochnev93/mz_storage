import React from 'react';

// Routes
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RequireAuth } from './hoc/RequireAuth.jsx';

// Favicon
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
import { Transfers } from './pages/Transfers/Transfers.jsx';
import { Profile } from './pages/Profile/Profile.jsx';


//Pafes Admin
import { AdminUsers } from './pages/Admin/AdminUsers.jsx';

// Components
import Advt from './components/elements/advt/Advt.jsx';

// Redux
import { store } from './store/store';
import { Provider } from 'react-redux';

// Styles
import './style/styles.module.scss';
import './style/vars.css';
import './index.css';





export default function App() {
    return (
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
                path="transfers"
                element={
                  <RequireAuth>
                    <Transfers />
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
                path="profile"
                element={
                  <RequireAuth>
                    <Profile />
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
                <Route path="users" element={<AdminUsers/>} />
              </Route>
    
              <Route path="login" element={<Auth />} />
    
              <Route path="*" element={<Error message={'Страница не найдена'} />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    )
}
