import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Icon, IconName } from '../Icon/Icon';
import styles from './FormField.module.css';

type BaseProps = {
  label: string;
  name: string;
  error?: string | null;
  touched?: boolean;
  icon?: IconName;
};


type FormFieldProps = BaseProps & (
  | ({ as?: 'input' } & InputHTMLAttributes<HTMLInputElement>)
  | ({ as: 'textarea' } & TextareaHTMLAttributes<HTMLTextAreaElement>)
);

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  name, 
  as = 'input', 
  error, 
  touched, 
  icon,
  required, 
  ...rest
}) => {
  const showError = touched && error;
  const showSuccess = touched && !error;

  const commonProps = {
    id: name,
    name: name,
    className: styles['form-input'],
    required: required,
  };

  return (
    <div className={styles['field-group']}>
      {label && (
        <label htmlFor={name} className={styles['field-label']}>
          {label} {required && <span className={styles['required-asterisk']}>*</span>}
        </label>
      )}
      <div className={styles['field-wrapper']}>
        {as === 'textarea' ? (
          <textarea 
            {...commonProps} 
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} 
          />
        ) : (
          <input 
            {...commonProps} 
            {...(rest as InputHTMLAttributes<HTMLInputElement>)} 
          />
        )}
        
        {icon && <div className={styles['field-icon']}><Icon name={icon} /></div>}

        <div className={styles['validation-icon']}>
          {showSuccess && <Icon name="check" stroke="#22C55E" />}
          {showError && <Icon name="x" stroke="#EF4444" />}
        </div>
      </div>
      {showError && <p className={styles['helper-text']}>{error}</p>}
    </div>
  );
};

export default FormField;
