import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import ErrorModal from '../../components/ui/ErrorModal';
import FormField from '../../components/ui/FormField';
import styles from './NewsletterForm.module.css';

interface FormState {
  value: string;
  error: string | null;
  touched: boolean;
}

const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required.';
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return 'Invalid email address.';
  return null;
};

const NewsletterForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({ value: '', error: null, touched: false });
  const [statusMessage, setStatusMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { execute: subscribe, loading, error, data } = useApi<{ message: string }, { email: string }>('/subscribe');

  useEffect(() => {
    if (data) {
      setStatusMessage(data.message);
      setFormState({ value: '', error: null, touched: false });
    }
    if (error) {
      setShowErrorModal(true);
      setStatusMessage('');
    }
  }, [data, error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const validationError = validateEmail(value);
    setFormState(prev => ({ ...prev, value, error: validationError }));
  };

  const handleBlur = () => {
    setFormState(prev => ({ ...prev, touched: true }));
  };

  const triggerSubmit = () => {
    setShowErrorModal(false);
    
    const validationError = validateEmail(formState.value);
    if (validationError) {
      setFormState(prev => ({ ...prev, error: validationError, touched: true }));
      return;
    }
    setStatusMessage('Subscribing...');
    subscribe({ email: formState.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    triggerSubmit();
  };

  return (
    <>
      <ErrorModal
        isVisible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        onRetry={triggerSubmit}
        isRetrying={loading}
        buttonText="Try Again"
        errorCode={error?.code}
        errorType={error?.message}
      />
      
      <form onSubmit={handleSubmit} className={styles['newsletter-input-container']}>

        <div className={styles['newsletter-form-field']}>
          <FormField
            label="" 
            name="email"
            type="email" 
            placeholder="Enter Your Email"
            value={formState.value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formState.error}
            touched={formState.touched}
            required 
          />
        </div>

        <button type="submit" className={styles['newsletter-button']} disabled={loading}>
          {loading && !showErrorModal ? '...' : 'Subscribe'}
        </button>
      </form>

      {!showErrorModal && statusMessage && <p style={{ color: 'white', fontSize: '12px', marginTop: '8px' }}>{statusMessage}</p>}
    </>
  );
};

export default NewsletterForm;