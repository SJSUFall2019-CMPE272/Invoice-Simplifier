import React, {Component} from 'react';
import LoggedOutNavBar from "../components/LoggedOutNavBar.jsx";
import Reveal from 'react-reveal/Reveal';
import invoiceGIF from '../assets/img/invoiceGIF.gif';
import dashboardSS from '../assets/img/dashboardSS.png';
import fight from '../assets/img/fight.png';
import steps from '../assets/img/steps.png';
import free from '../assets/img/free.jpg';
import './LoggedOutHome.css';

export default class LoggedInHome extends Component {

    render(){
        return(
            <div>
                <LoggedOutNavBar/>
                <Reveal effect="fadeInRight" effectOut="fadeOutLeft">
                    <div style={{'padding':'50px'}}>
                    <h1>Invoice Simplifier:</h1>
                    <h3>Invoice simplifier is a productivity application that tracks and analyses your expenses using invoice photos, thus eliminating the need for you to spend hours managing your expenses and budget.</h3>
                    <img style={{'height':'300px','padding-left':'200px'}} src={invoiceGIF}/>
                    <img style={{'height':'300px','padding-left':'250px'}} src={dashboardSS}/>
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
                        <h1 style={{'color':'white'}}>How simple our application is:</h1>
                        <ol style={{'float':'left', 'font-size':'2em','color':'white'}}>
                            <li>Upload invoice</li>
                            <li>Relax while we process your request</li>
                            <li>Get the results</li>
                            <li>Correct if we got something wrong</li>
                            <li>Save</li>
                            <li>Repeat</li>
                        </ol>
                        <img style={{'float':'right','height':'300px'}} src={steps}/>
                    </div>
                </Reveal>
                <Reveal effect="fadeInLeft" effectOut="fadeOutLeft">
                    <div>
                        <h1>Product Impact:</h1>
                        <ol>
                            <li>Reduce the cost of manual effort</li>
                            <li>Automate processes</li>
                            <li>Easy Access and Real time monitoring</li>
                            <li>Analytics</li>
                        </ol>
                    </div>
                </Reveal>
                <Reveal effect="fadeInLeft" effectOut="fadeOutLeft">
                    <div style={{'background-color':'rgb(122,196,183)'}}>
                        <h1>Cost:</h1>
                        <h3>Don’t worry it is all for free. Just login and see the magic</h3>
                        <img style={{'height':'300px'}} src={free}/>
                    </div>
                </Reveal>
            </div>
        )
    }
}

