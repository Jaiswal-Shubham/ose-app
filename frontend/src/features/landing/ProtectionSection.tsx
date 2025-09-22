import React from 'react';
import RiskScoreWidget from './RiskScoreWidget';
import styles from './ProtectionSection.module.css';

interface StepProps {
  number: string;
  title: string;
  description: React.ReactNode;
}

const stepsData: StepProps[] = [
  {
    number: '01',
    title: 'We Analyze',
    description: <>We score your open source dependencies, measuring community strength, maintainer expertise, <br/> and supply chain integrity.</>
  },
  {
    number: '02',
    title: 'We Alert',
    description: <>We send actionable, real-time alerts—detecting hidden risks, mapping CVEs, and clarifying <br/> exploitability with VEX to eliminate false positives.</>
  },
  {
    number: '03',
    title: 'We Partner',
    description: <>For your most critical dependencies, we provide direct support, collaborating with maintainers,<br/> hardening projects, and ensuring long-term security and sustainability.</>
  }
];

const Step: React.FC<StepProps> = ({ number, title, description }) => (
  <div className={styles.step}>
    <div className={styles['step-header']}>
      <div className={styles['step-number']}>{number}</div>
      <div className={styles['step-title']}>{title}</div>
    </div>
    <div className={styles['step-description']}>{description}</div>
  </div>
);


const ProtectionSection: React.FC = () => {
  return (
    <section className="protection-section">
      <div className="primary-title">Let Us Protect You</div>
      
      <div className={styles['protection-content']}>
        <div className={styles['steps-container']}>
          {stepsData.map(step => <Step key={step.number} {...step} />)}
        </div>
        <RiskScoreWidget />
      </div>
    </section>
  );
};

export default ProtectionSection;