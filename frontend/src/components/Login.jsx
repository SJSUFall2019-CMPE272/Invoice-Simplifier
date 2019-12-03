import React, {Component} from 'react';
import firebase from 'firebase';
import {Redirect, withRouter} from 'react-router-dom';
import '../components/Login.css';
import LoggedOutNavBar from "../components/LoggedOutNavBar";
import Reveal from 'react-reveal/Reveal';
import axios from 'axios';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp({
    apiKey: "AIzaSyB784uOdaw7ht273AICsNGdH8lwR3r2cFQ", 
    authDomain: "invoicesimplifier.firebaseapp.com"
})

class Login extends Component {
    state={isSignedIn : false, transitionClass: 'init', transitionClass1: 'init1'}
    uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID
        ],
    };

    componentWillMount = () =>{
        firebase.auth().onAuthStateChanged(user=>{
            this.setState({isSignedIn : !!user });
        });
    }

    componentDidMount(){
        this.timeoutId = setTimeout(function () {
            this.setState({transitionClass: 'final', transitionClass1: 'final1'});
        }.bind(this), 500);
    }

    render(){
        var action;
        if(this.state.isSignedIn) {
            axios.post("http://localhost:9000/users/createUser/", {
                "name": firebase.auth().currentUser.displayName,
                "email": firebase.auth().currentUser.email,
                "uid": firebase.auth().currentUser.uid
            })
            .then(res => {
                if(res.status == 200){
                    console.log("register successful");
                    localStorage.setItem('token', res.data.token);
                }
                else{
                    console.log("some error while registering");
                }
            })
            action =    <Redirect to="/admin" />
        } else {
            action =    <StyledFirebaseAuth 
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
        }

        return(
            <div className={this.state.transitionClass1}>
                <LoggedOutNavBar/>
                {/* <Reveal effect="jackInTheBox"> */}
                <div  className={this.state.transitionClass}>
                    {
                        action
                    }
                </div>
                {/* </Reveal> */}
            </div>
        )
    }
}

export default withRouter(Login);