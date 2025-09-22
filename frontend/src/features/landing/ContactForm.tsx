import React, { useState, useEffect } from 'react';
import FormField from '../../components/ui/FormField';
import ErrorModal from '../../components/ui/ErrorModal';
import { useApi } from '../../hooks/useApi';
import styles from './ContactForm.module.css'; 

interface FormValues {
  fullName: string;
  email: string;
  linkedin: string;
  message: string;
}

interface FormState {
  values: FormValues;
  errors: Partial<Record<keyof FormValues, string>>;
  touched: Partial<Record<keyof FormValues, boolean>>;
}

const initialFormState: FormState = {
  values: { fullName: '', email: '', linkedin: '', message: '' },
  errors: {},
  touched: {},
};

const validate = (values: FormValues): Partial<Record<keyof FormValues, string>> => {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (!values.fullName) {
    errors.fullName = 'Full name is required.';
  } else if (values.fullName.length < 3) {
    errors.fullName = 'Full name must be at least 3 characters.';
  } else if (!/^[a-zA-Z\s]*$/.test(values.fullName)) {
    errors.fullName = 'Full name can not contain special characters.';
  }

  if (!values.email) {
    errors.email = 'Email is required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address.';
  }

  if (values.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.*$/i.test(values.linkedin)) {
    errors.linkedin = 'Please enter a valid LinkedIn URL.';
  }

  if (!values.message) {
    errors.message = 'Message is required.';
  } else if (values.message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  return errors;
};


const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [statusMessage, setStatusMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  
  const { execute: submitForm, loading, error, data } = useApi<{ message: string }, FormValues>('/contact');

  useEffect(() => {
    if (data) {
      setStatusMessage(data.message);
      setFormState(initialFormState); 
    }
    if (error) {
      setShowErrorModal(true);
      setStatusMessage('');
    }
  }, [data, error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    const newValues = { ...formState.values, [name]: value };
    const validationErrors = validate(newValues);
    
    setFormState(prev => ({
      ...prev,
      values: newValues,
      errors: validationErrors,
    }));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    const validationErrors = validate(formState.values);
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
      errors: validationErrors,
    }));
  };

  const triggerSubmit = () => {
    const validationErrors = validate(formState.values);
    if (Object.keys(validationErrors).length > 0) {
      setFormState(prev => ({
        ...prev,
        touched: { fullName: true, email: true, linkedin: true, message: true },
        errors: validationErrors,
      }));
      return;
    }
    
    setStatusMessage('Sending...');
    submitForm(formState.values);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    triggerSubmit();
  };

  const handleCloseModalAndReset = () => {
    setShowErrorModal(false);
    setFormState(initialFormState);
  };

  return (
    <>
      <ErrorModal 
        isVisible={showErrorModal} 
        onClose={handleCloseModalAndReset}
        buttonText="Send Another Message"
        errorCode={error?.code}
        errorType={error?.message}
      />
      
      <form className={styles['contact-form']} onSubmit={handleSubmit}>
        <div className={styles['form-header']}>
          <div className={styles['form-title']}>Get In Touch</div>
          <div className={styles['form-description']}>
            This is so that we can get in contact with you in case any opportunity comes up
          </div>
        </div>
        
        <div className={styles['form-fields']}>
          {/* This new div will place the Full Name and Email fields on the same row */}
          <div className={styles['field-row']}>
            <FormField
              label="Your Full Name"
              name="fullName"
              value={formState.values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={formState.errors.fullName}
              touched={formState.touched.fullName}
              placeholder="Your Full Name"
              required
            />
            <FormField
              label="Your Email"
              name="email"
              type="email"
              value={formState.values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={formState.errors.email}
              touched={formState.touched.email}
              icon="email"
              placeholder="Your Email"
              required
            />
          </div>

          <FormField
            label="Your Linkedin"
            name="linkedin"
            value={formState.values.linkedin}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formState.errors.linkedin}
            touched={formState.touched.linkedin}
            placeholder="Your Linkedin"
          />
          <FormField
            label="Your Message"
            name="message"
            as="textarea"
            rows={4}
            value={formState.values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formState.errors.message}
            touched={formState.touched.message}
            placeholder="Enter your message..."
            required
          />
        </div>
        
        <button type="submit" className={styles['submit-button']} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>

        {!loading && !error && statusMessage && <p className={styles['status-message']}>{statusMessage}</p>}
      </form>
    </>
  );
};

export default ContactForm;