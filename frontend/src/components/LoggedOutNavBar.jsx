import React, {Component} from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

import "../components/LoggedOutNavBar.css";


export default class CustomNavBar extends Component {

    render(){
     return(
            <Navbar style={{'margin':'0px'}} color="dark"  expand="lg" collapseOnSelect>
                    <NavbarBrand style={{'font-size':'1.5em', 'font-weight':'bold'}} href="/">InvoiceSimplifier</NavbarBrand>
                    <NavbarToggler />
                <Collapse navbar className="justify-content-end">
                    <Nav pullRight >
                        <NavItem className="loginButton">
                            <Link style={{'font-weight':'bold'}} to="/login">Login</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}


