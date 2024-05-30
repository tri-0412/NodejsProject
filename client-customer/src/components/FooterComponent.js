// FooterComponent.js

import React from 'react';
import '../css/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faYoutube, faTiktok, faTelegram } from '@fortawesome/free-brands-svg-icons';
import logo from '../images/logo-company.jpg';

const FooterComponent = () => {
  const styles = {
    footer: {
      backgroundColor: '#333',
      color: '#fff',
      padding: '20px',
      textAlign: 'center',
      position: 'relative',
      bottom: '0',
      width: '100%',
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    icon: {
      margin: '5px',
    },
  };

  return (
    <footer style={styles.footer}>
      <div className="footer-content">
        <img src={logo} alt="Logo" className="logo" />
        <div className="contact-info" style={styles.contactInfo}>
          <p>THÔNG TIN LIÊN HỆ:</p>
          <p>Đại Lí Siêu Xe</p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} style={styles.icon} /> 69/68 Đ. Đặng Thuỳ Trâm, Phường 13, Bình Thạnh, Thành phố Hồ Chí Minh</p>
          <p><FontAwesomeIcon icon={faEnvelope} style={styles.icon} /> Dailisieuxe@gmail.com</p>
          <p><FontAwesomeIcon icon={faPhone} style={styles.icon} /> +84 0999999999</p>
          <p>© 2023 Đại lí siêu xe. All rights reserved.</p>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTiktok} />
          </a>
          <a href="https://t.me/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTelegram} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
