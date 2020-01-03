import React, {Component} from 'react';
import {UserComponent} from './UserComponent';

export default class CreateUserComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            firstName:'',
            lastName:'',
            interestedCourse:'',
            followUpDate:new Date()
        }
    }

    onChangeFirstName(e){
        this.setState({
            username: e.target.value
        })
    }

    render(){
        return(
            <div>
                <UserComponent></UserComponent>
            </div>
        );
    }
}