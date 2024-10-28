import { LineChart } from "@mui/x-charts";
import "./Dashboard.css";
import React, { useState } from 'react';
import logo from '../assets/Simmy Logo.png'; // Adjust the path as needed
import { useSelector } from 'react-redux';
import NavbarComponent from './Navbar';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { AudienceContext, FormContext } from './FormContext';
import axios from "axios";
import { Badge } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const text_map = {
  "Reach": "Reach text",
  "Impressions": "Impressions text",
  "Website Purchases": "Website Purchases text",
  "Pick a metric!": "Our AI models are capable of predicting the trends for a number of ad performance indicators, such as Reach, Impressions and Website Purchases. First, Simulate your results from the 'Simulate' button on the left. When you're done, pick the metric you want to see from the dropdown above to get a predicted trend line!"
}

export default function Simulation () {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownTitle, setDropDownTitle] = useState("Pick a metric!")
  const [dropDownText, setDropDownText] = useState("Our AI models are capable of predicting the trends for a number of ad performance indicators, such as Reach, Impressions and Website Purchases. First, Simulate your results from the 'Simulate' button on the left. When you're done, pick the metric you want to see from the dropdown above to get a predicted trend line!"
)

  const user = useSelector((state) => state.user); // Access the global user data

  const [simulationText, setSimulationText] = useState("Processing your audience...")

  const {formData, setFormData} = useContext(FormContext);
  const {a1data, setA1data} = useContext(AudienceContext);
  console.log(formData);
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  if(user === null) {
    return (
      <>
      <NavbarComponent />
      <div>
        <h1>Not logged in</h1>
        <p>Please log in or sign up to view this page</p>
      </div>
      </>
    );
  }

  const processInput = () => {
    setIsLoading(true);
    setPredictions([]);
    setTimeout(() => {setSimulationText("Running the AI model...")}, 10000);
    setTimeout(() => {setSimulationText("Predicting your results...")}, 20000);
    if(!isLoading){
    axios.post("https://forecastapi-226173475182.us-central1.run.app/forecast", {
      "budget": 100,
      "min_age": 18,
      "max_age": 45,
      "lower": 500000,
      "upper": 1000000,
      "industry": 0
    }, {headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
    }})
    .then((resp) => {
      //console.log(resp.data);
      var preds = resp.data.preds;
      var values = [...Array(25)].map((_, i) => [Number(preds[i*15][0]), Number(preds[i*15][1])]);
      //console.log(values);
      setPredictions(values)
      setIsLoading(false);
      setDropDownTitle("Reach");
      setDropDownText(text_map["Reach"]);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    })
    }
  }

  const handleSelect = (evt) => {
    setDropDownTitle(evt);
    setDropDownText(text_map[evt]);
  }

  if(user === null) {
    return (
      <>
      <NavbarComponent />
      <div>
        <h1>Not logged in</h1>
        <p>Please log in or sign up to view this page</p>
      </div>
      </>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">
          <Navbar.Brand href="/">
                <img
                   src={logo}
                   className="d-inline-block align-top"
                   alt="React Bootstrap logo"
                   />
             </Navbar.Brand>
          </div>
        </div>
        <div className="navbar-right">
          <a href="/instructions">View Instructions</a>
          <a href="/knowledge-center">Knowledge Center</a>
          <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
            <button onClick={toggleDropdown} className="dropdown-toggle">
            {user.name}
            </button>
            <div className="dropdown-menu">
              <a href="/profile">Dashboard</a>
                <a href="/settings">Settings</a>
                <a href="/billing">Campaign History</a>
              <a href="/logout">Logout</a>
            </div>
          </div>
        </div>
      </nav>

    <Container>

      <Row>
        <Col>
        <Card style={{ width: '35rem' }}>
          <Card.Body>
            <Card.Title>Audience A1</Card.Title>
            <Card.Text>
                {(a1data.length > 0) && 
                  <div className="rectangle-container">
                    <p>Age range: {a1data[0]}</p>
                    <p>Demographic: {a1data[1]}</p>
                    <div>Tags: {a1data[2].slice(0,10).map((x, _) => <Badge>{x}</Badge>)} </div>
                  </div>
                }
            </Card.Text>
            <Button variant="primary" disabled={isLoading} onClick={() => processInput()}>{isLoading ? simulationText : "Simulate!"}</Button>
          </Card.Body>
        </Card>
    </Col>
    <Col>
    <Row>
    <div className="Simulation">
        <LineChart
          xAxis={[{ data: ["Jan 1", "Jan 15", "Feb 1", "Feb 15", "Mar 1", "Mar 15", "Apr 1", "Apr 15", "May 1", "May 15", "June 1", "June 15", "July 1", "July 15", "Aug 1", "Aug 15", "Sep 1", "Sep 15", "Oct 1", "Oct 15", "Nov 1", "Nov 15", "Dec 1", "Dec 15", "Dec 31"], scaleType: "point", label: "Month" }]}
          leftAxis={null}
          series={predictions.length > 0 ? [
            {
              data: predictions.map((x, _) => x[0]), label: "Reach (millions)"
            },
          ] : []}
          width={800}
          height={300}
        />
      </div>
    </Row>
    <Row>
        <Card style={{ width: '35rem' }}>
          <Card.Body>
            <Card.Title>
              Interpreting results
              <DropdownButton id="dropdown-basic-button" title={dropDownTitle} onSelect={(evt) => handleSelect(evt)}>
              <Dropdown.Item eventKey="Reach" disabled={predictions.length == 0}>Reach</Dropdown.Item>
              <Dropdown.Item eventKey="Impressions" disabled={predictions.length == 0}>Impressions</Dropdown.Item>
              <Dropdown.Item eventKey="Website Purchases" disabled={predictions.length == 0}>Website Purchases</Dropdown.Item>
            </DropdownButton>
            </Card.Title>
            <Card.Text>
              {dropDownText}
            </Card.Text>
          </Card.Body>
        </Card>
    </Row>
</Col>
    </Row>
    </Container>
    </div>
  )
}
