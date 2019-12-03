import React, {Component} from 'react';
import firebase from 'firebase';
import AdminLayout from "../layouts/Admin.jsx";
import LoggedOutHome from './LoggedOutHome';

export default class Home extends Component {

    componentWillMount = () => {
        
    }

    render(){
        var user = firebase.auth().currentUser;
        var action;
        if(user){
            action = <AdminLayout {...this.props}/>
        }
        else{
            action = <LoggedOutHome/>
        }
        return(
            action
        )
    }
}