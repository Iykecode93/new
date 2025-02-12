import React from 'react';
import './Contact.css'; // Import the CSS file for styling

const ContactPage = () => {
    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            <p>If you have any questions or inquiries, feel free to reach out to us:</p>
            
            <div className="contact-link">
                <a href="mailto:example@example.com" className="email-link">
                    📧 Email Us: example@example.com
                </a>
            </div>

            <div className="social-links">
                <h3>Follow Us:</h3>
                <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                    WhatsApp
                </a>
                <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                    Facebook
                </a>
                <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                    LinkedIn
                </a>
            </div>
        </div>
    );
};

export default ContactPage;
