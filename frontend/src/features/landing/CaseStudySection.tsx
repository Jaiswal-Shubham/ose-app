import React from 'react';
import { Icon, IconName } from '../../components/Icon/Icon';
import styles from './CaseStudySection.module.css';

interface InfoCardProps {
  iconName: IconName;
  title: React.ReactNode;
  details: React.ReactNode[];
}

const caseStudyData: InfoCardProps[] = [
  {
    iconName: 'reputation',
    title: <>Reputational <br/> Damage</>,
    details: [
      'Damaged brand reputation.',
      'Consumer trust erosion.',
      'Negative press and public scrutiny.',
    ],
  },
  {
    iconName: 'financial',
    title: <>Financial <br/> Devastation</>,
    details: [
      <><span className={styles['bold-text']}>$700M+</span> legal exposure established.</>,
      <><span className={styles['bold-text']}>$90,000+</span> average direct cost per breach</>,
      'Massive overtime for 24/7 "war rooms".',
    ],
  },
  {
    iconName: 'operational',
    title: <>Operational <br/> Paralysis</>,
    details: [
      <><span className={styles['bold-text']}>Up to 3,300 developer hours lost.</span></>,
      'All innovation halted.',
      <>29% recurrence rate forced costly rework <br/> cycles.</>,
    ],
  },
];

const InfoCard: React.FC<InfoCardProps> = ({ iconName, title, details }) => (
  <div className={styles['info-card']}>
    <Icon name={iconName} className={styles['info-icon']} /> 
    <div className={styles['card-content']}>
      <div className={styles['card-title']}>{title}</div>
      {details.map((text, index) => (
        <div key={index} className={styles['card-info']}>{text}</div>
      ))}
    </div>
  </div>
);

const CaseStudySection: React.FC = () => {
  return (
    <section className="case-study-section">
      <div className="title-subtitle-container">
        <div className={styles['case-study-title']}>
          Do You Remember <span className={styles['highlight-text']}>Log4Shell?</span>
        </div>
        <div className="primary-subtitle">
          In December 2021, Log4Shell (CVE-2021-44228) exposed millions of Java-based systems worldwide. 
          A single logging library triggered a global cybersecurity crisis with catastrophic consequences.
        </div>
      </div>
      
      <div className={styles['info-cards']}>
        {caseStudyData.map(card => <InfoCard key={card.iconName} {...card} />)}
      </div>
      
      <div className={styles['cta-text']}>
        Don't let your organization be the next case study.
      </div>
    </section>
  );
};

export default CaseStudySection;