/*!

=========================================================
* Now UI Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

// core components
import PanelHeader from "../components/PanelHeader/PanelHeader.jsx";

import firebase from 'firebase';

class User extends React.Component {
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder="Email" type="email" defaultValue={firebase.auth().currentUser.email}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Name</label>
                          <Input
                            defaultValue={firebase.auth().currentUser.displayName}
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                  <Button color="primary" style={{'font-weight':'bold'}}>Save</Button>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img alt="..." src={require("../assets/img/bg5.jpg")} />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={firebase.auth().currentUser.photoURL}
                      />
                      <h5 className="title">{firebase.auth().currentUser.displayName}</h5>
                    </a>
                  </div>
                </CardBody>
                <hr />
                <div className="button-container">
                  <Button
                    className="btn-neutral btn-icon btn-round"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="lg"
                  >
                    <i className="fab fa-facebook-f" />
                  </Button>
                  <Button
                    className="btn-neutral btn-icon btn-round"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="lg"
                  >
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button
                    className="btn-neutral btn-icon btn-round"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="lg"
                  >
                    <i className="fab fa-google-plus-g" />
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default User;
