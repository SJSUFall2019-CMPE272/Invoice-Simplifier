import React, {Component} from 'react';
import LoggedOutNavBar from "../components/LoggedOutNavBar.jsx";
import Reveal from 'react-reveal/Reveal';
import invoiceGIF from '../assets/img/invoiceGIF.gif';
import dashboardSS from '../assets/img/dashboardSS.png';
import fight from '../assets/img/fight.png';
import steps from '../assets/img/steps.png';
import free from '../assets/img/free.jpg';
import hammer from '../assets/img/hammer.png';
import './LoggedOutHome.css';
import {Row, Col} from 'reactstrap';

export default class LoggedInHome extends Component {

    render(){
        return(
            <div>
                <LoggedOutNavBar/>
                <Reveal effect="fadeInRight" effectOut="fadeOutLeft">
                    <div style={{'padding':'50px'}}>
                    <h1 style={{'font-weight':'bold'}}>Invoice Simplifier:</h1>
                    <h3>Invoice simplifier is a productivity application that tracks and analyses your expenses using invoice photos, thus eliminating the need for you to spend hours managing your expenses and budget.</h3>
                    <img style={{'height':'400px','padding-left':'100px'}} src={invoiceGIF}/>
                    <i style={{'font-size':'10em', 'margin':'40px'}} className="fas fa-arrow-right" />
                    <img style={{'height':'400px','padding-left':'70px'}} src={dashboardSS}/>
                    </div>
                </Reveal>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Reveal effect="fadeInLeft" effectOut="fadeOutLeft">
                    <div className='div1'>
                        <h1 style={{'color':'white'}}>There are many problems with manual keeping:</h1>
                        <ol style={{'float':'left', 'font-size':'2em','color':'white'}}>
                            <li>Tedious</li>
                            <li>Time consuming reconciliations</li>
                            <li>Missing crucial details</li>
                            <li>In-accurate manual interpretations</li>
                            <li>Conflicts</li>
                        </ol>
                        <img style={{'float':'right','height':'300px'}} src={fight}/>
                    </div>
                </Reveal>
                <Reveal effect="fadeIn" effectOut="rotateOutDownLeft">
                    <div style={{'background-color':'rgb(0,183,249)', 'padding':'50px', 'height':'500px'}}>
                        <img style={{'float':'left','height':'300px'}} src={steps}/>
                        <h1 style={{'color':'white', 'float':'right'}}>How simple our application is:</h1>
                        <ol style={{'float':'right', 'font-size':'2em','color':'white', 'margin-right':'150px'}}>
                            <li>Upload invoice</li>
                            <li>Relax while we process your request</li>
                            <li>Get the results</li>
                            <li>Correct if we got something wrong</li>
                            <li>Save</li>
                            <li>Get the analytics</li>
                            <li>Repeat</li>
                        </ol>
                        
                    </div>
                </Reveal>
                <Reveal effect="jackInTheBox" effectOut="fadeOutLeft">
                    <div style={{'padding-left':'50px', 'padding-top':'50px', 'background-color':'rgb(0,193,141', 'color':'white'}}>
                        <Row>
                        <Col>
                        <h1>Product Impact:</h1>
                        <ol style={{'font-size':'2em', 'color':'white'}}>
                            <li>Reduce the cost of manual effort</li>
                            <li>Automate processes</li>
                            <li>Easy Access and Real time monitoring</li>
                            <li>Analytics</li>
                        </ol>
                        </Col>
                        <Col>
                        <img style={{'height':'400px','padding-left':'70px'}} src={hammer}/>
                        </Col>
                        </Row>
                    </div>
                </Reveal>
                <Reveal effect="flipInX" effectOut="fadeOutLeft">
                    <div style={{'background-color':'rgb(122,196,183)', 'color':'white'}}>
                        <Row style={{'margin-left':'50px'}}>
                        <Col lg={7} >
                        <h1 style={{'margin-top':'50px'}}>Cost:</h1>
                        <h3 style={{'float':'left'}}>Don’t worry it's all free. Just login and see the magic!s</h3>
                        </Col>
                        <Col lg={5}>
                        <img style={{'height':'350px', 'margin-left':'100px'}} src={free}/>
                        </Col>
                        </Row>
                    </div>
                </Reveal>
            </div>
        )
    }
}

