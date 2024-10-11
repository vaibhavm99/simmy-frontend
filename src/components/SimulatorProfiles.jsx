
import NavbarComponent from './Navbar';
import './SimulatorProfiles.css';
import { useContext, useEffect, useState } from 'react';
import { AudienceContext, FormContext, ProfileUpdated } from './FormContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Badge } from 'react-bootstrap';

const SimulatorProfiles = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(formData.storeName);
        if(formData.storeName == ''){
            navigate('/simulator-profiles');
        }
    }, []);

    const {formData, setFormData} = useContext(FormContext);
    const {updated, setUpdated} = useContext(ProfileUpdated);
    const {a1data, setA1data} = useContext(AudienceContext);

    console.log(formData, updated);

    if(updated) {
      axios.post("https://newtag-226173475182.us-central1.run.app/process_input", {
        "name": formData["storeName"],
        "link": formData["webUrl"],
        "description": formData["description"],
        "products": formData["items"],
        "industry": "0"
      }, {headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true,
      }})
      .then((resp) => {
        //console.log(resp.data);
        var preds = resp.data;
        setA1data(preds.data);
        console.log(preds);
        setUpdated(false);
      })
      .catch((err) => {
        console.log(err);
        setA1data(["18-35", "female", ["tag1", "tag2"]]);
        setUpdated(false);
      })

    }

    const redirectTo = (path) => {
      navigate(path);
    }
    
    return (
        <>
            <NavbarComponent />
            
            {/* Button at the top to navigate to new simulator profile */}
            <div className="top-button-container">
                <h2>Welcome to Simmy Simulator !</h2>
                <button className="navigate-button" onClick={() => redirectTo('/simulator-profiles-new')}>
                    Update Simulator Profile
                </button>
            </div>

            {/* Main container with a styled rectangle and info */}
            <div className="rectangle-container">
                <h3>Audiences</h3>
                <p>This section contains details about the Audiences.</p>
                {(a1data.length > 0) && 
                  <div className="rectangle-container">
                    <p>Age range: {a1data[0]}</p>
                    <p>Demographic: {a1data[1]}</p>
                    <div>Tags: {a1data[2].map((x, _) => <Badge>{x}</Badge>)} </div>
                  </div>
                }
              <button className="action-button" onClick={() => redirectTo('/simulation')}>
                  {updated ? "Creating an audience..." : ((a1data.length > 0) ? "Simulate audience!" : "Update your profile to get an audience!")}
              </button>
            </div>
        </>
    );
}
 
export default SimulatorProfiles;
