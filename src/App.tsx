import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './navigation/navbar/navbar';
import { Navigation } from './navigation/navigation';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Dashboard from './main/dashboard/dashboard';
import Incidents from './main/incidents/incidents';
import Settings from './main/settings/settings';
import { NotFound } from './navigation/not-found/not-found';
import { SideNavbar } from './navigation/side-navbar/side-navbar';
import { CreateEditIncident } from './main/incidents/create-edit-incident/create-edit-incident';
import { Users } from './main/users/users';
import { Products } from './main/products/products';
import { CreateEditProduct } from './main/products/create-edit-product/create-edit-product';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigation />} >
          <Route index element={<Dashboard />} />
          <Route path='products/*' element={<Products />} />
          <Route path='products/create-product' element={<CreateEditProduct />} />
          <Route path='products/edit-product' element={<CreateEditProduct />} />
          <Route path='incidents/*' element={<Incidents />} />
          <Route path='incidents/create-incident' element={<CreateEditIncident />} />
          <Route path='incidents/edit-incident' element={<CreateEditIncident />} />
          <Route path='users/' element={<Users />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
