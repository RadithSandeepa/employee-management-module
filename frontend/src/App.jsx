import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Login from './pages/Login';
import Home from './pages/Home';
import List from './pages/List';
import NewEmployee from './pages/NewEmployee';
import SingleEmployee from './pages/SingleEmployee';
import EditEmployee from './pages/EditEmployee';
import NewUser from './pages/NewUser';
import SingleUser from './pages/SingleUser';
import EditUser from './pages/EditUser';
import Profile from './pages/Profile';
import { employeeColumns, userColumns } from "./datatableSource"; 


function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className='app'>
      <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path=":userId" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Route>
          <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route path=":userId">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <SingleUser />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="edit"
                  element={
                    <ProtectedRoute>
                      <EditUser />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewUser title="New User" />
                  </ProtectedRoute>
                }
              />
          </Route>
          <Route path="employees">
          <Route
            index
            element={
              <ProtectedRoute>
                <List columns={employeeColumns} />
              </ProtectedRoute>
            }
          />
          <Route path=":employeeId">
            <Route
              index
              element={
                <ProtectedRoute>
                  <SingleEmployee />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit"
              element={
                <ProtectedRoute>
                  <EditEmployee />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewEmployee title="New Employee" />
              </ProtectedRoute>
            }
          />
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;