import './SimulatorProfilesNew.css';
import NavbarComponent from './Navbar';
import { useContext, useEffect, useState } from 'react';
import { FormContext } from './FormContext';
import { useNavigate } from 'react-router-dom';
const SimulatorProfilesNew = () => {
    // State to handle form data
    const {formData, setFormData} = useContext(FormContext);
    const navigate = useNavigate();
    //if formdat.storename is not '' redirecto to '/simulator-profiles-new' on mount
    useEffect(() => {
        console.log(formData.storeName);
        //use react router instead of windows.location.href

        if(formData.storeName !== ''){
            navigate('/simulator-profiles');
        }
    }, []);
  
    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/simulator-profiles');
    };

    return (
        <>
            <NavbarComponent />
            <div className="simulator-profiles-container">
                <h2>Welcome to Simmy Simulator !</h2>
                <form className="simulator-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="storeName">Store Name</label>
                        <input
                            type="text"
                            id="storeName"
                            placeholder="Your stores name"
                            name="storeName"
                            value={formData.storeName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="webUrl">Web URL</label>
                        <input
                            type="text"
                            id="webUrl"
                            placeholder='Your stores website URL'
                            name="webUrl"
                            value={formData.webUrl}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="industry">Industry</label>
                        <input
                            type="text"
                            id="industry"
                            name="industry"
                            placeholder='e.g. Fashion, Electronics, etc.'
                            value={formData.industry}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder='Describe your store'
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="items">List a few items and Their Prices</label>
                        <textarea
                            id="items"
                            placeholder='e.g. Item1: $10, Item2: $20'
                            name="items"
                            value={formData.items}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default SimulatorProfilesNew;
