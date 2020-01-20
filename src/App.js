import React from 'react';
import './App.css';
import { HashRouter as Router, Route} from 'react-router-dom';
import MiniDrawer from './materialComponents/miniDrawer';
import LoginComponent from './components/Login/LoginComponent'
import { AuthContext } from "./components/Login/context/auth";
import  PrivateRoute  from './components/Login/PrivateRoute'



function App() {

  const [authTokens, setAuthTokens] = React.useState();
  console.log("This is the process.env", process.env.PUBLIC_URL)
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <Router>    
      <Route exact path={'/'} component={LoginComponent} />
      <PrivateRoute exact path="/home" component={MiniDrawer} />
      
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
