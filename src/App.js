import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {CourseComponent} from './components/CourseComponent';
import Navbar from './components/NavbarComponent';
import MiniDrawer from './materialComponents/miniDrawer';
import LoginComponent from './components/Login/LoginComponent'
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { AuthContext } from "./components/Login/context/auth";
import  PrivateRoute  from './components/Login/PrivateRoute'



function App() {

  const [authTokens, setAuthTokens] = React.useState();
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <Router>    
      <Route exact path="/" component={LoginComponent} />
      <PrivateRoute exact path="/home" component={MiniDrawer} />
      
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
