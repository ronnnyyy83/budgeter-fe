import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { setUser } from './actions/user';
import { State } from './reducers';
import Dashboard from './screens/Dashboard';
import Incomes from './screens/Incomes';
import Header from './screens/Header';
import Login from './screens/Login';
import Register from './screens/Register';
import Expenses from './screens/Expenses';
import SearchIncome from './screens/SeacrhIncome';
import SearchExpense from './screens/SeacrhExpense';

const Router: React.FC<any> = () => {
  const token = useSelector((state: State) => state.user.user?.token);
  const dispatch = useDispatch();

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      let storageUser = localStorage.getItem('user');

      if (!storageUser) {
        return <Navigate to="/login" replace />;
      } else {
        dispatch(setUser(JSON.parse(storageUser)));
      }
    }
  
    return children;
  };

  const NonProtectedRoute = ({ children }) => {
    if (!token) {
      let storageUser = localStorage.getItem('user');

      if (!storageUser) {
        return children;
      } else {
        dispatch(setUser(JSON.parse(storageUser)));
      }
    }
  
    return <Navigate to="/dashboard" replace />;
  };
  
  return (
    <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route
              path={'/register'}
              element={
                <NonProtectedRoute>
                  <Header />
                  <Register />
                </NonProtectedRoute>
              }
            />
            <Route
              path={'/login'}
              element={
                <NonProtectedRoute>
                  <Header />
                  <Login />
                </NonProtectedRoute>
              }
            />
            <Route
              path={'/dashboard'}
              element={
                <ProtectedRoute>
                  <Header />
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path={'/incomes'}
              element={
                <ProtectedRoute>
                  <Header />
                  <Incomes />
                </ProtectedRoute>
              }
            />
            <Route
              path={'/expenses'}
              element={
                <ProtectedRoute>
                  <Header />
                  <Expenses />
                </ProtectedRoute>
              }
            />
            <Route
              path={'/searchincome'}
              element={
                <ProtectedRoute>
                  <Header />
                  <SearchIncome />
                </ProtectedRoute>
              }
            />
            <Route
              path={'/searchexpense'}
              element={
                <ProtectedRoute>
                  <Header />
                  <SearchExpense />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
    </React.Fragment>
  )
}

export default Router;
