
import NavbarComponent from './Navbar';
import './SimulatorProfiles.css';
import { useContext, useEffect, useState } from 'react';
import { FormContext } from './FormContext';
import { useNavigate } from 'react-router-dom';
const SimulatorProfiles = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(formData.storeName);
        if(formData.storeName == ''){
            navigate('/simulator-profiles');
        }
    }, []);

    const {formData, setFormData} = useContext(FormContext);

    console.log(formData);

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
                
                <button className="action-button" onClick={() => redirectTo('/simulation')}>
                    Simulate
                </button>
            </div>
        </>
    );
}
 
export default SimulatorProfiles;
