import React from "react";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import MiniDrawer from "./components/Drawer/miniDrawer";
import LoginComponent from "./components/LoginScreen/LoginComponent";
import { AuthProvider } from "./components/LoginScreen/context/auth";
import PrivateRoute from "./components/LoginScreen/PrivateRoute";
import { AbilityContext, ability } from "./privilegehandler/privilegehandler";
import { FetchProvider } from "./utils/context/fetchContext";

function App() {
  return (
    <AbilityContext.Provider value={ability}>
      <AuthProvider>
        <FetchProvider>
          <Router>
            <Switch>
              <Route exact path={"/"} component={LoginComponent} />
              <PrivateRoute path="/home" component={MiniDrawer} />
              <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
          </Router>
        </FetchProvider>
      </AuthProvider>
    </AbilityContext.Provider>
  );
}

export default App;
