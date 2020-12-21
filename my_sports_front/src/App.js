import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import DashboardPage from './Pages/DashboardPage'
import NotFoundPage from './Pages/NotFoundPage'

function App() {
  return <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginPage}/>
      <Route path="/register" component={RegisterPage}/>
      <Route path="/dashboard" component={DashboardPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Switch>
  </BrowserRouter>
}

export default App;
