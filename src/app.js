import React, { useEffect } from 'react';

// Routes
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RequireAuth } from './hoc/RequireAuth.jsx';

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
import { AdminCategory } from './pages/Admin/AdminCategory.jsx';


// Redux
import { useDispatch } from 'react-redux';
import { fetchData } from './features/app/appSlice.js';

// Styles
import './style/styles.module.scss';
import './style/vars.css';
import './index.css';


export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth allowAccess={['admin', 'user', 'viewer']}>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route
          path="nomenclature"
          element={
            <RequireAuth allowAccess={['admin', 'user']}>
              <Nomenclature />
            </RequireAuth>
          }
        />

        <Route
          path="receipt"
          element={
            <RequireAuth allowAccess={['admin', 'user']}>
              <Receipt />
            </RequireAuth>
          }
        />

        <Route
          path="warehouses"
          element={
            <RequireAuth allowAccess={['admin', 'user']}>
              <Warehouses />
            </RequireAuth>
          }
        />

        <Route
          path="transfers"
          element={
            <RequireAuth allowAccess={['admin', 'user']}>
              <Transfers />
            </RequireAuth>
          }
        />

        <Route
          path="about"
          element={
            <RequireAuth allowAccess={['admin', 'user', 'viewer']}>
              <About />
            </RequireAuth>
          }
        />

        <Route
          path="profile"
          element={
            <RequireAuth allowAccess={['admin', 'user', 'viewer']}>
              <Profile />
            </RequireAuth>
          }
        />

        <Route
          path="admin/*"
          element={
            <RequireAuth allowAccess={['admin']}>
              <Admin />
            </RequireAuth>
          }
        >
          <Route path="users" element={<AdminUsers />} />
          <Route path="category" element={<AdminCategory />} />
        </Route>

        <Route path="login" element={<Auth />} />

        <Route path="*" element={<Error message={'Страница не найдена'} />} />
      </Routes>
    </BrowserRouter>
  );
}
