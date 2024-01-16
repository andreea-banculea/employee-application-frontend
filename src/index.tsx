import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Use BrowserRouter instead of Router
import ViewEmployees from './Employees/ViewEmployees';
import ViewDepartments from './Departments/ViewDepartments';
import { Provider } from 'react-redux';
import store from './store/store';
import CreateEmployee from './Employees/CreateEmployee';
import CreateDepartment from './Departments/CreateDepartment';
import Login from './Components/Login/Login';

const theme = createTheme();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to='/login' />} />
            <Route path="/login" element={<Login />} />
            <Route path="/employees" element={<ViewEmployees />} />
            <Route path="/departments" element={<ViewDepartments />} />
            <Route path="employees/create" element={<CreateEmployee />} />
            <Route path="departments/create" element={<CreateDepartment />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
