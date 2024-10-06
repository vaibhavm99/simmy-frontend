import React, { useState } from 'react';
import './Dashboard.css'; // External CSS file for styling
import logo from '../assets/Simmy Logo.png'; // Adjust the path as needed
import { useSelector } from 'react-redux';
import NavbarComponent from './Navbar';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';




const Dashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user); // Access the global user data
  const navigate = useNavigate();
  const [viewInitialData, setViewInitialData] = useState(false);
  const [viewOptimizedData, setViewOptimizedData] = useState(false);

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

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      {/* <nav className="navbar">
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
      </nav> */}
      <NavbarComponent />

      {/* Main Content */}
      <div className="dashboard-container">
        <div className="header-section">
          <h1>Campaigns</h1>
          <div className="buttons">
            <button className="btn btn-primary" onClick={()=>{setViewInitialData(!viewInitialData)}}>View Initial Data</button>
            <button className="btn btn-success" onClick={()=>{setViewOptimizedData(!viewOptimizedData)}}>View Optimized Data</button>
            <button className="btn btn-secondary">Understand these results</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button className="tab active">Campaigns</button>
          <button className="tab">Ad Sets</button>
          <button className="tab">Ads</button>
          <button className='btn btn-primary' style={{ position: 'absolute', right: '5%' }}onClick={() => navigate('/CampaignManager')}>Create Campaign</button>
        </div>

        {/* Table */}
        <div className="table-container">
          <h2>Optimized Campaigns</h2>
          <table>
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Budget</th>
                <th>Impressions</th>
                <th>Reach</th>
                <th>Amount Spent</th>
                <th>Purchases</th>
                <th>Cost Per Purchase</th>
                <th>Purchase Conversion Value</th>
                <th>Purchase Roas</th>
                <th>AOV</th>
                <th>CPM</th>
              </tr>
            </thead>
            <tbody>
{ viewInitialData &&<tr>
                <td>Campaign 1</td>
                <td>$120.00</td>
                <td>70,116</td>
                <td>22,052</td>
                <td>$600.00</td>
                <td>8</td>
                <td>$75.00</td>
                <td>$950.00</td>
                <td>158.33%</td>
                <td>$118.75</td>
                <td>$8.56</td>
              </tr>}
{ viewOptimizedData &&<tr>
                <td>(Optimized) Campaign 1</td>
                <td>$120.00</td>
                <td>75,922</td>
                <td>23,330</td>
                <td>$600.00</td>
                <td>15</td>
                <td style={{ color: 'green' }}>$40.00</td>
                <td>$1,250.00</td>
                <td style={{ color: 'green' }}>208.33%</td>
                <td>$83.33</td>
                <td>$25.72</td>
              </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;