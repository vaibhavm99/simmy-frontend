// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Footer from './components/Footer';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import ProductList from './components/ProductList';
import Contact from './components/Contact';
import Signup from './components/Signup';
import SurveyForm from './components/SurveyForm';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Options from './components/Options';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import store, { persistor } from './components/store'; // Import your store and persistor
import Logout from './components/Logout';
import {FormContext, ProfileUpdated, AudienceContext} from './components/FormContext';
import CampaignManager from './components/CampaignManager';
import AdSetManager from './components/AdSetManager';
import AdManager from './components/AdManager';
import 'bootstrap/dist/css/bootstrap.min.css';
import SimulatorProfilesNew from './components/SimulatorProfilesNew';
import { useContext, useState } from 'react';
import SimulatorProfiles from './components/SimulatorProfiles';
import Simulation from './components/Simulation';

const App = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    webUrl: '',
    industry: '',
    description: '',
    items: ''
  });
  const [updated, setUpdated] = useState(false);
  const [a1data, setA1data] = useState([]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <Router>
      <div>
        <main>
        <FormContext.Provider value={{formData,setFormData}}>
        <ProfileUpdated.Provider value={{updated,setUpdated}}>
        <AudienceContext.Provider value={{a1data, setA1data}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/survey" element={<SurveyForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path='/users' element={< Options />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/simulator-profiles-new" element={<SimulatorProfilesNew/>} />
            <Route path="/simulator-profiles" element={<SimulatorProfiles/>} />
            <Route path="/simulation" element={<Simulation/>} />
            <Route path="/CampaignManager" element={< CampaignManager />} />
            <Route path="/AdSetManager" element={< AdSetManager />} />
            <Route path="/adManager" element={< AdManager />} />
          </Routes>
          </AudienceContext.Provider>
          </ProfileUpdated.Provider>
          </FormContext.Provider>
        </main>
        <div style={{padding: "5%"}}/>
        <Footer />
      </div>
    </Router>
    </PersistGate>
    </Provider>
  );
};

export default App;
