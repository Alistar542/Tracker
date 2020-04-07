import React from 'react';
import './App.css';
import { HashRouter as Router, Route} from 'react-router-dom';
import MiniDrawer from './components/Drawer/miniDrawer';
import LoginComponent from './components/LoginScreen/LoginComponent'
import { AuthProvider  } from "./components/LoginScreen/context/auth";
import  PrivateRoute  from './components/LoginScreen/PrivateRoute'



function App() {

  return (
    <AuthProvider >
    
    
      <Router>
      <Route exact path={'/'} component={LoginComponent} />
      <PrivateRoute path="/home" component={MiniDrawer} />
      </Router>
      
    </AuthProvider>
  );
}

export default App;
