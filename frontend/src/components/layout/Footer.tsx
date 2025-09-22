import React from 'react';
import { Icon } from '../Icon/Icon';
import NewsletterForm from '../../features/landing/NewsletterForm';
import styles from './Footer.module.css'; 

interface FooterLinkProps {
  text: string;
  href?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ text, href = "#" }) => (
  <a href={href} className={styles['footer-link']}>
    <div className={styles['footer-link-text']}>{text}</div>
    <div className={styles['nav-link-underline']}></div> 
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-top']}>
        <div className={styles['footer-brand']}>
          <div className={styles['footer-logo']}>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/6f8b583e3a7cdbe4955a09dc9fed231c7815ca3c?width=150"
              alt="Open Source Economy Logo"
              className={styles['footer-logo-image']}
            />
            <div className={styles['footer-brand-name']}>Open Source Economy</div>
          </div>
          <div className={styles['footer-description']}>
            Open Source Economy is a non-profit organization dedicated to helping developers 
            keep <br/>contributing to open source while receiving funding for their projects.
          </div>
        </div>
        
        <div className={styles['footer-links-section']}>
          <div className={styles['footer-section-title']}>Company</div>
          <FooterLink text="About" />
          <FooterLink text="Services" />
        </div>
        
        <div className={styles['footer-links-section']}>
          <div className={styles['footer-section-title']}>Resources</div>
          <FooterLink text="Blog" />
          <FooterLink text="Documentation" />
          <FooterLink text="Support" />
        </div>
        
        <div className={styles['footer-newsletter']}>
          <div className={styles['social-icons']}>
            <Icon name="linkedin" className={styles['social-icon']} />
            <Icon name="twitter" className={styles['social-icon']} />
            <Icon name="youtube" className={styles['social-icon']} />
          </div>
          
          {/* The parent container for the Newsletter label and Form */}
          <div className="newsletter-section">
            <div className="newsletter-label">Newsletter</div>
            <NewsletterForm />
          </div>
        </div>
      </div>
      
      <div className={styles['footer-bottom']}>
        <div className={styles['footer-rights']}>
          <span>© Open Source Economy - Non profit organisation -</span>
          <FooterLink text="CHE-440.058.692" />
          <span>Switzerland</span>
        </div>
        <div className={styles['footer-legal']}>
          <FooterLink text="Terms Of Service" />
          <div className={styles['legal-separator']}></div>
          <FooterLink text="Privacy Policy" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;