import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import DashboardPage from './Pages/DashboardPage'
import NotFoundPage from './Pages/NotFoundPage'
import { AuthRoute, ProtectedRoute } from "./util/route";

function App() {
  return <BrowserRouter>
    <Switch>
      <AuthRoute path="/login" component={LoginPage}/>
      <AuthRoute path="/register" component={RegisterPage}/>
      <ProtectedRoute path="/dashboard" component={DashboardPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Switch>
  </BrowserRouter>
}

export default App;
