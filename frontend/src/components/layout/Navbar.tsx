import React from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { text: 'Home', href: '/' },
  { text: 'About Us', href: '/about' },
  { text: 'Solutions', href: '/solutions' },
  { text: 'Contact Us', href: '/contact' },
];

interface NavLinkProps {
  text: string;
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ text, href }) => (
  <a href={href} className={styles['nav-link']}>
    <div className={styles['nav-link-text']}>{text}</div>
    <div className={styles['nav-link-underline']}></div>
  </a>
);

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles['logo-container']}>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/43f58951f80aefb779f5152d2c324465a54afef1?width=137"
          alt="Open Source Economy Logo"
          className={styles['logo-image']}
        />
        <div className={styles['company-name']}>
          Open Source Economy
        </div>
      </div>
      
      <div className={styles['nav-links']}>
        {navLinks.map(link => (
          <NavLink key={link.text} text={link.text} href={link.href} />
        ))}
      </div>
      
      <button className={styles['sign-in-button']}>Sign In</button>
      
      <div className={styles['mobile-menu']}>☰</div>
    </nav>
  );
};

export default Navbar;