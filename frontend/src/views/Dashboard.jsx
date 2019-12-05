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
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import firebase from 'firebase';
import axios from 'axios';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip
} from "reactstrap";

// core components
import PanelHeader from "../components/PanelHeader/PanelHeader.jsx";

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart
} from "../variables/charts.jsx";

class Dashboard extends React.Component {

  state = {
    monthlyExpenditure: null,
    monthlyStats: null,
    history: null,
    percent: 0,
    percent1: 0,
    monthlyDiscounts: null
  }

  componentDidMount = () =>{
      var d = new Date();
      var m = d.getMonth()+1;
      var month = "";
      if(m < 10){
        month += "0";
      }
      month += m.toString();
      axios.get("http://35.153.207.33:9000/users/getMonthlyExpenditure/" + firebase.auth().currentUser.uid,{ 
        // receive two    parameter endpoint url ,form data
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      })
      .then(res => {
        if(res.status == 200){
          console.log(res.data);
          var canvas = document.createElement('canvas');
          const ctx = canvas.getContext("2d");
          var chartColor = "#FFFFFF";
          var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
          gradientStroke.addColorStop(0, "#80b6f4");
          gradientStroke.addColorStop(1, chartColor);
          var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
          gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
          gradientFill.addColorStop(1, "rgba(255, 0, 255, 0.14)");
          var dat = {
            labels: [
              "JAN",
              "FEB",
              "MAR",
              "APR",
              "MAY",
              "JUN",
              "JUL",
              "AUG",
              "SEP",
              "OCT",
              "NOV",
              "DEC"
            ],
            datasets: [
              {
                label: "Data",
                borderColor: chartColor,
                pointBorderColor: chartColor,
                pointBackgroundColor: "#2c2c2c",
                pointHoverBackgroundColor: "#2c2c2c",
                pointHoverBorderColor: chartColor,
                pointBorderWidth: 1,
                pointHoverRadius: 7,
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                fill: true,
                backgroundColor: gradientFill,
                borderWidth: 2,
                data: [50, 150, 100, 190, 130, 90, 150, 160, 120, 140, 190, 95]
              }
            ]
          }
          dat.datasets[0].data = res.data.monthlyExpenditure;
          var mo = d.getMonth();
          var lastMonth = res.data.monthlyExpenditure[mo-1];
          if(lastMonth == 0) lastMonth  = 1;
          var thisMonth = res.data.monthlyExpenditure[mo];
          var diff = ((thisMonth - lastMonth) / lastMonth) * 100;
          diff = Math.floor(diff);
          this.setState({monthlyExpenditure: dat, percent: diff});
        }
      });
      axios.get("http://35.153.207.33:9000/users/getMonthlyStats/" + firebase.auth().currentUser.uid + "?month=" + month,{ 
        // receive two    parameter endpoint url ,form data
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      })
      .then(res => {
        if(res.status == 200){
          console.log(res.data);
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext("2d");
          var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
          gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
          gradientFill.addColorStop(1, "rgba(44,168,255, 0.6)");
          var dat = {
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ],
            datasets: [
              {
                label: "Total Spending",
                backgroundColor: gradientFill,
                borderColor: "#2CA8FF",
                pointBorderColor: "#FFF",
                pointBackgroundColor: "#2CA8FF",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 1,
                data: [80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]
              }
            ]
          }
          dat.labels = res.data.issuedBy;
          dat.datasets[0].data = res.data.totalBillAfterTax;
          console.log(dat);
          this.setState({monthlyStats: dat});
        }
      });
      axios.get("http://35.153.207.33:9000/users/getMonthlyDiscountStats/" + firebase.auth().currentUser.uid + "?month=" + month,{ 
        // receive two    parameter endpoint url ,form data
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      })
      .then(res => {
        if(res.status == 200){
          console.log(res.data);
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext("2d");
          var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
          gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
          gradientFill.addColorStop(1, "rgba(44,168,255, 0.6)");
          var dat = {
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ],
            datasets: [
              {
                label: "Total Discounts",
                backgroundColor: gradientFill,
                borderColor: "#2CA8FF",
                pointBorderColor: "#FFF",
                pointBackgroundColor: "#2CA8FF",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 1,
                data: [80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]
              }
            ]
          }
          dat.labels = res.data.issuedBy;
          dat.datasets[0].data = res.data.totalDiscount;
          console.log(dat);
          this.setState({monthlyDiscounts: dat});
        }
      });
      axios.get("http://35.153.207.33:9000/users/getInvoices/" + firebase.auth().currentUser.uid,{ 
        // receive two    parameter endpoint url ,form data
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      })
      .then(res => {
        if(res.status == 200){
          console.log(res.data);
          var history = [];
          var i;
          console.log("res.data length ", res.data.length);
          if(res.data.length != 0){
          for(i = res.data.length-1; i >= 0; i--){
            history.push(<tr><td>{res.data[i].billIssuedBy}</td><td>{res.data[i].receiptDate}</td><td>{res.data[i].totalBillAfterTax}</td></tr>);
          }
          if(res.data.length > 1){
          var lastMonth = res.data[res.data.length-2].totalBillAfterTax;
          if(lastMonth == 0) lastMonth  = 1;
          var thisMonth = res.data[res.data.length-1].totalBillAfterTax;
          var diff = ((thisMonth - lastMonth) / lastMonth) * 100;
          diff = Math.floor(diff);
          this.setState({ percent1: diff});
          }
          this.setState({history: history});
        }
        }
      })
  }

  render() {
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var date = new Date();
    var thisMo = date.getMonth();
    return (
      <>
        <PanelHeader
          size="lg"
          content={
            <Line
              data={(this.state.monthlyExpenditure != null) ? this.state.monthlyExpenditure : dashboardPanelChart.data}
              options={dashboardPanelChart.options}
            />
          }
        />
        <div className="content">
          <Row>
            <Col xs={12} md={6}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">Discounts for {months[thisMo]} per Issuer</CardTitle>
                </CardHeader>
                <CardBody>
                <div className="chart-area">
                    {(this.state.monthlyDiscounts != null) && <Bar
                      data={(this.state.monthlyDiscounts != null) ? this.state.monthlyDiscounts : dashboard24HoursPerformanceChart.data}
                      options={dashboard24HoursPerformanceChart.options}
                    />}
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="now-ui-icons arrows-1_refresh-69" /> Just
                    Updated
                  </div>
                </CardFooter>
              </Card>
            </Col>
            
            <Col xs={12} md={6}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">Expenditure for {months[thisMo]} per Issuer</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    {(this.state.monthlyStats != null) && <Bar
                      data={(this.state.monthlyStats != null) ? this.state.monthlyStats : dashboard24HoursPerformanceChart.data}
                      options={dashboard24HoursPerformanceChart.options}
                    />}
                  </div>
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Card className="card-tasks">
                <CardHeader>
                  <h5 className="card-category">Backend Development</h5>
                  <CardTitle tag="h4">Misc</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        <tr style={{ 'margin-bottom':'100px'}}>
                          <td style={{'font-size':'1.3em'}}>
                            Your monthly expenditure has {(this.state.percent < 0) ? <span style={{'color':'green', 'font-weight':'bold'}}>decreased</span> : <span style={{'color':'red', 'font-weight':'bold'}}>increased</span>} by {Math.abs(this.state.percent)}%
                          </td>
                        </tr>
                        <br/>
                        <tr>
                          <td style={{'font-size':'1.3em'}}>
                            Your expenditure since the last invoice upload has {(this.state.percent1 < 0) ? <span style={{'color':'green', 'font-weight':'bold'}}>decreased</span> : <span style={{'color':'red', 'font-weight':'bold'}}>increased</span>} by {Math.abs(this.state.percent1)}%
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="now-ui-icons loader_refresh spin" /> Updated 3
                    minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Upload History</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Issued By</th>
                        <th>Date</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-right">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-right">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-right">$56,142</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-right">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-right">$78,615</td>
                      </tr> */}
                      {this.state.history}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
