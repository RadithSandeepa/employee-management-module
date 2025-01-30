import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from './pages/Login';
import Home from './pages/Home';
import List from './pages/List';
import New from './pages/New';
import { employeeColumns, userColumns } from "./datatableSource";
import { employeeInputs, userInputs } from "./formSource";

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
              {/* <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
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
          {/* <Route
            path=":employeeId"
            element={
              <ProtectedRoute>
                <Single />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <New inputs={employeeInputs} title="Add New Employee" />
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