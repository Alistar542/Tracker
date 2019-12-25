import React, {Component} from 'react';
import {Link} from 'react-router-dom';


import PrimarySearchAppBar from '../materialComponents/primarySearchAppBar';
import MiniDrawer from '../materialComponents/miniDrawer';

export default class Navbar extends Component{
    render(){
        return(
            <div>
            {/* <MiniDrawer></MiniDrawer> */}
             <Link to='/add'>Add Course</Link>
            </div>
        )
    }
}


