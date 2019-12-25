import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {CourseComponent} from './components/CourseComponent';
import Navbar from './components/NavbarComponent';
import MiniDrawer from './materialComponents/miniDrawer';



function App() {
  return (
    <Router>
    {/* <div className="App">
      <CourseComponent/>
    </div> */}

      <MiniDrawer/>
    
      
    </Router>
  );
}

export default App;
