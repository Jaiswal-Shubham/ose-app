import React from 'react';
import styles from './ErrorModal.module.css'; // 1. Import the CSS module

interface ErrorModalProps {
  isVisible?: boolean;
  onClose: () => void;
  onRetry?: () => void;
  isRetrying?: boolean;
  errorCode?: string | number;
  errorType?: string;
  buttonText?: string;
}

const errorCodeMap: Record<string, string> = {
  '503': 'Service Unavailable',
  '500': 'Server Unavailable',
  '401': 'Unauthorized',
  '403': 'Forbidden Access',
  '404': 'Not Found',
  'CLIENT_ERROR': 'Server Unavailable',
};

const ErrorModal: React.FC<ErrorModalProps> = ({
  isVisible = false,
  onClose,
  onRetry,
  isRetrying = false,
  errorCode = "500",
  errorType = "An unknown error occurred.",
  buttonText = "Try Again"
}) => {
  if (!isVisible) {
    return null;
  }

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  const handleButtonClick = onRetry || onClose;
  const friendlyMessage = errorCodeMap[errorCode] || errorType;

  return (
    // 2. Apply styles to all elements
    <div className={styles['error-modal-overlay']} onClick={onClose}>
      <div className={styles['error-modal-container']} onClick={handleModalContentClick}>
        <div className={styles['error-modal-content']}>
          <div className={styles['error-close-button']} onClick={onClose}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 25L25 1M1 1L25 25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className={styles['error-content-wrapper']}>
            <div className={styles['error-icon-container']}>
              <div className={styles['error-icon-overlay']}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 15V21.25M35 20C35 21.9698 34.612 23.9204 33.8582 25.7403C33.1044 27.5601 31.9995 29.2137 30.6066 30.6066C29.2137 31.9995 27.5601 33.1044 25.7403 33.8582C23.9204 34.612 21.9698 35 20 35C18.0302 35 16.0796 34.612 14.2597 33.8582C12.4399 33.1044 10.7863 31.9995 9.3934 30.6066C8.00052 29.2137 6.89563 27.5601 6.14181 25.7403C5.38799 23.9204 5 21.9698 5 20C5 16.0218 6.58035 12.2064 9.3934 9.3934C12.2064 6.58035 16.0218 5 20 5C23.9782 5 27.7936 6.58035 30.6066 9.3934C33.4196 12.2064 35 16.0218 35 20ZM20 26.25H20.0133V26.2633H20V26.25Z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <div className={styles['error-title-section']}>
              <h2 className={styles['error-title']}>Oops! Something went wrong</h2>
            </div>
            <p className={styles['error-description']}>
              We couldn't process your request at the moment.<br/> Please check your connection and try again.
            </p>
            <div className={styles['error-details-section']}>
              <div className={styles['error-details-container']} style={{ justifyContent: 'center' }}>
                <div className={styles['error-detail-item']}>
                  <div className={styles['error-detail-dot']}></div>
                  <div className={styles['error-detail-text']}>Error Code: {errorCode} {friendlyMessage}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['error-button-section']}>
            <button 
              className={styles['error-retry-button']} 
              onClick={handleButtonClick}
              disabled={isRetrying}
            >
              {isRetrying ? 'Retrying...' : buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;