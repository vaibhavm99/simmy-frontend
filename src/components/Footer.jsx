// src/components/Footer.jsx
import React from 'react';
import logo from '../assets/Simmy Logo.png'; // Adjust the path as needed

const Footer = () => {
  return (
    // <>
    // <footer>
    //   <p>&copy; 2024 Simmy. All rights reserved.</p>
    // </footer>

    // <div className="container">
    //   Hello
    // </div>
    // </>

    <div class="footer-card">
    <div class="footer-section">
        <h3>About Us</h3>
        <ul>
            <li><a href="#">Company</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Condition</a></li>
        </ul>
    </div>
    <div class="footer-section">
        <h3>Product</h3>
        <ul>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Support</a></li>
        </ul>
    </div>
    <div class="footer-section">
        <h3>Resources</h3>
        <ul>
            <li><a href="#">Customers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Whitepaper</a></li>
            <li><a href="#">Media Coverage</a></li>
        </ul>
    </div>
    <div class="footer-section">
        <h3>Our Office</h3>
        <p>Peach Tree Street No.34, Atlanta, Georgia USA</p>
        <p>404-777-9087</p>
        <p><a href="mailto:hello@simmy.com">hello@simmy.com</a></p>
    </div>
    <div class="footer-bottom">
        <div class="footer-logo">
            <img src={logo} alt="Simmy Logo" />
        </div>
        <p>© 2024 Simmy, All rights reserved.</p>
    </div>
</div>
    
  );
};

export default Footer;