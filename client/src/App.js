import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import DashBoard from "./components/pages/Dashboard";

function App() {
  document.title = "TBRef.ai";
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={DashBoard} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
