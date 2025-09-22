import React from 'react';
import ContactForm from './ContactForm';
import styles from './ContactSection.module.css';

const ContactSection: React.FC = () => {
  return (
    <section className="contact-section">
      <div className="title-subtitle-container">
        <div className="primary-title">Don't Wait For The Next Breach</div>
        <div className="primary-subtitle">
          We're here to support your business. Whether you want to learn more about our services, 
          explore collaboration opportunities, or need guidance, our team is ready to help you 
          strengthen your open source security.
        </div>
      </div>
      
      <div className={styles['contact-form-wrapper']}>
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactSection;