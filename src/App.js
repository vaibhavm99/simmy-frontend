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

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <Router>
      <div>
        <main>
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
          </Routes>
        </main>
        <div style={{padding: "2%"}}/>
        <Footer />
      </div>
    </Router>
    </PersistGate>
    </Provider>
  );
};

export default App;